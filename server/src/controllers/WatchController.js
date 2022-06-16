const axios = require('axios')
const cheerio = require('cheerio')

class WatchController {
    async get(req,res){
        const { url } = req.query
        const fullUrl = `https://vuighe.net/${url}`

        try {
            const html = await axios.get(fullUrl)
            const $ = cheerio.load(html.data)

            const episode = $('.container')
            const dataId = $(episode).attr('data-id')

            const name = $('.film-info-title').html()
            const views = $('.film-info-views span').html()

            const result = await axios.get(`https://vuighe.net/api/v2/films/${dataId}/episodes`, {
                headers: {
                    'Referer': fullUrl,
                    'X-Requested-With': 'XMLHttpRequest'
                }
            })

            res.json({
                success: true,
                data: {
                    name,
                    views,
                    result: result.data.data
                }
            })
        } catch (error) {
            console.log(error)

            res.json({
                success: false,
                message: "Có lỗi xảy ra"
            })
        }
    }

    async post(req,res){
        const { url } = req.body
        const fullUrl = `https://vuighe.net/${url}`

        try {
            const html = await axios.get(fullUrl)
            const $ = cheerio.load(html.data)

            const episode = $('.container')
            const dataId = $(episode).attr('data-id')
            const dataEpisodeId = $(episode).attr('data-episode-id')

            const result = await axios.get(`https://vuighe.net/api/v2/films/${dataId}/episodes/${dataEpisodeId}/true`, {
                headers: {
                    'Referer': fullUrl,
                    'X-Requested-With': 'XMLHttpRequest'
                }
            })

            const chap = await axios.get(`https://vuighe.net/api/v2/films/${dataId}/episodes?sort=name`,{
                headers: {
                    'Referer': fullUrl,
                    'X-Requested-With': 'XMLHttpRequest'
                }
            })

            var info = {
                type: []
            }
            const content = $('.film-content .film-info')
            $(content).find('.film-info-genre a').each((index, el) => {
                info.type.push({
                    name: $(el).html(),
                    url: $(el).attr('href')
                })
            })

            info.subteam = $(content).find('.film-info-subteam a').html()
            info.des = $(content).find('.film-info-description').html()

            const source = result.data.sources.fb.length == 0 ? result.data.sources.vip[0] : result.data.sources.fb[0] 

            res.json({
                success: true,
                data: {
                    ...result.data,
                    source,
                    chap: chap.data.data,
                    content: info
                }
            })
        } catch (error) {
            console.log(error)

            res.json({
                success: false,
                message: "Có lỗi xảy ra"
            })
        }
    }

}

module.exports = new WatchController