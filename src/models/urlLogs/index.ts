import { UrlLogsDocument } from '../@types'
import { BaseModel } from '../base/base.model'
import { Urls } from '../urls/urls.entity'
import { UrlLogs } from './urlLogs.entity'
class UrlLogsModel extends BaseModel<UrlLogsDocument> {
  constructor() {
    super(UrlLogs)
  }

  analyticsByAlias = async (alias: string) => {
    try {
      const result = await Urls.aggregate([
        {
          $match: { alias },
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
                    $dateSubtract: {
                      startDate: new Date(),
                      unit: 'day',
                      amount: '$$daysAgo',
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
}

export const urlLogsModel = new UrlLogsModel()
