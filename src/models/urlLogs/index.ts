import { UrlLogsDocument } from '../@types'
import { BaseModel } from '../base/base.model'
import { Urls } from '../urls/urls.entity'
import { Users } from '../users/users.entity'
import { UrlLogs } from './urlLogs.entity'
class UrlLogsModel extends BaseModel<UrlLogsDocument> {
  constructor() {
    super(UrlLogs)
  }

  analyticsByAlias = async (userId: string, alias?: string) => {
    try {
      let query: { alias?: string; userId: string } = { userId }

      if (alias) query.alias = alias
      const result = await Urls.aggregate([
        {
          $match: query,
        },
        {
          $lookup: {
            from: 'urlLogs',
            localField: 'urlId',
            foreignField: 'urlId',
            as: 'logs',
          },
        },
        {
          $project: {
            //    totalUrls: { $literal: 1 }, // Placeholder for counting URLs

            totalClicks: { $size: '$logs' },
            uniqueClicks: {
              $size: { $setUnion: '$logs.geoIp' },
            },
            clicksByDate: {
              $map: {
                input: [0, 1, 2, 3, 4, 5, 6, 7], // input
                as: 'daysAgo',
                in: {
                  date: {
                    $dateToString: {
                      format: '%Y-%m-%d',
                      date: {
                        $dateSubtract: {
                          startDate: new Date(),
                          unit: 'day',
                          amount: '$$daysAgo',
                        },
                      },
                    },
                  },
                  count: {
                    $size: {
                      $filter: {
                        input: '$logs',
                        as: 'log',
                        cond: {
                          $eq: [
                            {
                              $dateToString: {
                                format: '%Y-%m-%d',
                                date: '$$log.createdAt',
                              },
                            },
                            {
                              $dateToString: {
                                format: '%Y-%m-%d',
                                date: {
                                  $dateSubtract: {
                                    startDate: new Date(),
                                    unit: 'day',
                                    amount: '$$daysAgo',
                                  },
                                },
                              },
                            },
                          ],
                        },
                      },
                    },
                  },
                },
              },
            },
            osType: {
              $map: {
                input: { $setUnion: '$logs.os' },
                as: 'filterByOs',
                in: {
                  osName: '$$filterByOs',
                  uniqueClicks: {
                    $size: {
                      $setUnion: {
                        $map: {
                          input: {
                            $filter: {
                              input: '$logs',
                              as: 'log',
                              cond: { $eq: ['$$log.os', '$$filterByOs'] },
                            },
                          },
                          as: 'filterLog',
                          in: '$$filterLog.geoIp',
                        },
                      },
                    },
                  },

                  uniqueUsers: {
                    $size: {
                      $setUnion: {
                        $map: {
                          input: {
                            $filter: {
                              input: '$logs',
                              as: 'log',
                              cond: { $eq: ['$$log.os', '$$filterByOs'] },
                            },
                          },
                          as: 'filterLog',
                          in: '$$filterLog.sessionId',
                        },
                      },
                    },
                  },
                },
              },
            },
            deviceType: {
              $map: {
                input: { $setUnion: '$logs.platform' },
                as: 'filterByPlatform',
                in: {
                  deviceName: '$$filterByPlatform',
                  uniqueClicks: {
                    $size: {
                      $setUnion: {
                        $map: {
                          input: {
                            $filter: {
                              input: '$logs',
                              as: 'log',
                              cond: {
                                $eq: ['$$log.platform', '$$filterByPlatform'],
                              },
                            },
                          },
                          as: 'filterLog',
                          in: '$$filterLog.geoIp',
                        },
                      },
                    },
                  },

                  uniqueUsers: {
                    $size: {
                      $setUnion: {
                        $map: {
                          input: {
                            $filter: {
                              input: '$logs',
                              as: 'log',
                              cond: {
                                $eq: ['$$log.platform', '$$filterByPlatform'],
                              },
                            },
                          },
                          as: 'filterByPlatform',
                          in: '$$filterByPlatform.sessionId',
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      ])

      return result
    } catch (error) {
      console.error(error)
      return Promise.reject(error)
    }
  }

  overAllAnalytics = async (userId: string) => {
    try {
      const result = await Users.aggregate([
        {
          $match: { userId },
        },
        {
          $lookup: {
            from: 'urls',
            localField: 'userId',
            foreignField: 'userId',
            as: 'urls',
          },
        },
        {
          $lookup: {
            from: 'urlLogs',
            localField: 'userId',
            foreignField: 'userId',
            as: 'logs',
          },
        },
        {
          $project: {
            totalUrls: { $size: '$urls' },
            totalClicks: { $size: '$logs' },
            uniqueClicks: {
              $size: { $setUnion: '$logs.geoIp' },
            },
            clicksByDate: {
              $map: {
                input: [0, 1, 2, 3, 4, 5, 6, 7], // input
                as: 'daysAgo',
                in: {
                  date: {
                    $dateToString: {
                      format: '%Y-%m-%d',
                      date: {
                        $dateSubtract: {
                          startDate: new Date(),
                          unit: 'day',
                          amount: '$$daysAgo',
                        },
                      },
                    },
                  },
                  count: {
                    $size: {
                      $filter: {
                        input: '$logs',
                        as: 'log',
                        cond: {
                          $eq: [
                            {
                              $dateToString: {
                                format: '%Y-%m-%d',
                                date: '$$log.createdAt',
                              },
                            },
                            {
                              $dateToString: {
                                format: '%Y-%m-%d',
                                date: {
                                  $dateSubtract: {
                                    startDate: new Date(),
                                    unit: 'day',
                                    amount: '$$daysAgo',
                                  },
                                },
                              },
                            },
                          ],
                        },
                      },
                    },
                  },
                },
              },
            },
            osType: {
              $map: {
                input: { $setUnion: '$logs.os' },
                as: 'filterByOs',
                in: {
                  osName: '$$filterByOs',
                  uniqueClicks: {
                    $size: {
                      $setUnion: {
                        $map: {
                          input: {
                            $filter: {
                              input: '$logs',
                              as: 'log',
                              cond: { $eq: ['$$log.os', '$$filterByOs'] },
                            },
                          },
                          as: 'filterLog',
                          in: '$$filterLog.geoIp',
                        },
                      },
                    },
                  },

                  uniqueUsers: {
                    $size: {
                      $setUnion: {
                        $map: {
                          input: {
                            $filter: {
                              input: '$logs',
                              as: 'log',
                              cond: { $eq: ['$$log.os', '$$filterByOs'] },
                            },
                          },
                          as: 'filterLog',
                          in: '$$filterLog.sessionId',
                        },
                      },
                    },
                  },
                },
              },
            },
            deviceType: {
              $map: {
                input: { $setUnion: '$logs.platform' },
                as: 'filterByPlatform',
                in: {
                  deviceName: '$$filterByPlatform',
                  uniqueClicks: {
                    $size: {
                      $setUnion: {
                        $map: {
                          input: {
                            $filter: {
                              input: '$logs',
                              as: 'log',
                              cond: {
                                $eq: ['$$log.platform', '$$filterByPlatform'],
                              },
                            },
                          },
                          as: 'filterLog',
                          in: '$$filterLog.geoIp',
                        },
                      },
                    },
                  },

                  uniqueUsers: {
                    $size: {
                      $setUnion: {
                        $map: {
                          input: {
                            $filter: {
                              input: '$logs',
                              as: 'log',
                              cond: {
                                $eq: ['$$log.platform', '$$filterByPlatform'],
                              },
                            },
                          },
                          as: 'filterByPlatform',
                          in: '$$filterByPlatform.sessionId',
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      ])
      return result
    } catch (error) {
      return Promise.reject(error)
    }
  }

  analyticsByTopic = async (userId: string, topic: string) => {
    try {
      const result = await Users.aggregate([
        {
          $match: {
            userId,
          },
        },
        {
          $lookup: {
            from: 'urls',
            localField: 'userId',
            foreignField: 'userId',
            as: 'urls',
            pipeline: [
              {
                $match: { topic },
              },
            ],
          },
        },
        {
          $set: {
            urlIds: {
              $map: {
                input: '$urls',
                as: 'url',
                in: '$$url.urlId',
              },
            },
          },
        },

        {
          $lookup: {
            let: { urlIds: '$urlIds' },
            from: 'urlLogs',
            localField: 'userId',
            foreignField: 'userId',
            pipeline: [
              {
                $match: {
                  $expr: { $in: ['$urlId', '$$urlIds'] }, // Match `urlId` in the passed `urlIds` array.
                },
              },
            ],
            as: 'urlLogs',
          },
        },
        {
          $project: {
            totalClicks: { $size: '$urlLogs' },
            uniqueClicks: {
              $size: {
                $setUnion: {
                  $map: {
                    input: '$urlLogs',
                    as: 'log',
                    in: '$$log.geoIp',
                  },
                },
              },
            },

            clicksByDate: {
              $map: {
                input: [0, 1, 2, 3, 4, 5, 6, 7],
                as: 'daysAgo',
                in: {
                  date: {
                    $dateToString: {
                      format: '%Y-%m-%d',
                      date: {
                        $dateSubtract: {
                          startDate: new Date(),
                          unit: 'day',
                          amount: '$$daysAgo',
                        },
                      },
                    },
                  },
                  count: {
                    $size: {
                      $filter: {
                        input: '$urlLogs',
                        as: 'log',
                        cond: {
                          $eq: [
                            {
                              $dateToString: {
                                format: '%Y-%m-%d',
                                date: '$$log.createdAt',
                              },
                            },
                            {
                              $dateToString: {
                                format: '%Y-%m-%d',
                                date: {
                                  $dateSubtract: {
                                    startDate: new Date(),
                                    unit: 'day',
                                    amount: '$$daysAgo',
                                  },
                                },
                              },
                            },
                          ],
                        },
                      },
                    },
                  },
                },
              },
            },

            urls: {
              $map: {
                input: '$urls',
                as: 'url',
                in: {
                  shortUrl: {
                    $concat: [
                      process.env.BASE_URL,
                      '/api/shorten/',
                      '$$url.alias',
                    ],
                  },
                  totalClicks: {
                    $size: {
                      $filter: {
                        input: '$urlLogs',
                        as: 'log',
                        cond: {
                          $eq: ['$$url.urlId', '$$log.urlId'],
                        },
                      },
                    },
                  },
                  uniqueClicks: {
                    $size: {
                      $setUnion: {
                        $map: {
                          input: {
                            $filter: {
                              input: '$urlLogs',
                              as: 'log',
                              cond: { $eq: ['$$log.urlId', '$$url.urlId'] },
                            },
                          },
                          as: 'log',
                          in: '$$log.geoIp',
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      ])

      return result
    } catch (error) {
      console.log(error)
      return Promise.reject(error)
    }
  }
}

export const urlLogsModel = new UrlLogsModel()
