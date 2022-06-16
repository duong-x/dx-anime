const axios = require('axios')
const cheerio = require('cheerio')
const { json } = require('express')


class CategoryController {
    async index(req, res) {
        try {
            const { data } = await axios.get('https://vuighe.net/anime/kich-tinh')

            const $ = cheerio.load(data)
            var json = []

            $('.genre .genre-item').each((index, el) => {
                json.push({
                    name: $(el).html(),
                    url: $(el).attr('href')
                })
            })

            json = json.slice(1, json.length)

            res.json({
                success: true,
                data: json
            })
        } catch (error) {
            console.log(error)
            res.json({
                success: false,
                message: 'Có lỗi xảy ra'
            })
        }
    }

    async anime(req, res) {
        const p = req.query.p || 1
        const limit = 24
        const url = req.params.url

        try {
            const { data } = await axios.get(`https://vuighe.net/anime/${url}/trang-${p}`)
            const $ = cheerio.load(data)

            const pg = $('input[name=total-item]')
            const total = $(pg).attr('value')
            const title = $('.genre .genre-item.activated').html()


            var json = []

            $('.tray .tray-item').each((index, el) => {
                const a = $(el).find('a')
                const img = $(el).find('a img')
                const name = $(el).find('.tray-item-description .tray-item-title')
                const view = $(el).find('.tray-item-description .tray-item-meta-info .tray-film-views')


                json.push({
                    url: $(a).attr('href'),
                    thumbnail: $(img).attr('data-src'),
                    film_name: $(name).html(),
                    view: $(view).html(),
                })
            })

            res.json({
                success: true,
                data: {
                    title,
                    limit,
                    total,
                    result: json
                }
            })


        } catch (error) {
            console.log(error)
            res.json({
                success: false,
                message: 'Có lỗi xảy ra'
            })
        }
    }
}


module.exports = new CategoryController