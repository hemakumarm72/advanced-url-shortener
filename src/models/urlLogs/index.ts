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
                input: [0, 1, 2, 3, 4, 5, 6, 7],
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
              
            }
          },
        },
      ])
    } catch (error) {
      return Promise.reject(error)
    }
  }
}

export const urlLogsModel = new UrlLogsModel()
