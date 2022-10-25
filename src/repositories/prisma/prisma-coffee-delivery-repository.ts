import { prisma } from '../../prisma'
import { FeatureCollection, Feature, Geometry, GeoJsonProperties, Point } from 'geojson'
import {
  CoffeeData,
  CoffeeDeliveryRepository,
} from '../coffee-delivery-repository'

export class PrismaCoffeeDeliveryRepository implements CoffeeDeliveryRepository {
  async getFeaturesCollection(): Promise<FeatureCollection> {
    const stores = await prisma.store.findMany({
      include: {
        lngLat: {
          select: {
            lat: true,
            lng: true
          }
        }
      },
    })

    const features: Feature<Geometry, GeoJsonProperties>[] = stores.map(store => ({
      type: 'Feature',
      properties: {
        id: store.id,
        name: store.name
      },
      geometry: {
        type: 'Point',
        coordinates: [store.lngLat?.lng, store.lngLat?.lat]
      } as Point
    }))
    
    const geojson: FeatureCollection = {
      type: 'FeatureCollection',
      features
    }
    
    return geojson
  }

  async getCoffees(): Promise<CoffeeData[]> {
    const coffees = await prisma.coffee.findMany({
      orderBy: {
        createdAt: 'asc'
      },
      include: {
        store: false,
        coffeesOnTags: {
          select: {
            tag: {
              select: {
                id: true,
                name: true
              }
            }
          }
        },
        inventory: {
          select: {
            id: true,
            quantity: true
          }
        },
      },
    })
    
    return coffees
  }

  async postOrder(order: any): Promise<void> {
    try {
      await prisma.order.create({
        data: {
          orderCoffee: {
            create: order.cart.map((item: any) => ({
              coffeeId: item.id,
              quantity: item.quantity
            }))
          },
          point: {
            create: {
              lng: order.point.geographicCoordinates.lng,
              lat: order.point.geographicCoordinates.lat,
              features: {
                create: {
                  city: order.point.city,
                  complement: order.point.complement,
                  neighborhood: order.point.neighborhood,
                  number: order.point.number,
                  postalCode: order.point.postalCode,
                  state: order.point.state,
                  street: order.point.street,
                }
              }
            }
          },
          payment: {
            create: {
              method: order.payment.paymentMethod,
              price: order.payment.price
            }
          },
          customer: {
            connect: {
              email: order.customer
            }
          }
        }
      })
    } catch (error) {
      console.log(error)
    }
    
    // Atualizar estoque dos itens comprados
    for (const iterator of order.cart) {
      await prisma.coffee.update({
        where: {
          id: iterator.id
        },
        data: {
          inventory: {
            update: {
              quantity: {
                decrement: iterator.quantity
              },
              updatedAt: new Date().toISOString()
            }
          }
        }
      })
    }
  }
}
