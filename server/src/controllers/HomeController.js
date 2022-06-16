const axios = require('axios')
const cheerio = require('cheerio')


class HomeController {
    async new(req, res) {
        const p = req.query.p || 1
        const limit = 20

        try {
            const result = await axios.get('https://vuighe.net/tap-moi-nhat')
            const $ = cheerio.load(result.data)

            var json = []

            $('.episode .tray-item').each((index, el) => {
                const a = $(el).find('a')
                const img = $(el).find('a img')
                const filmname = $(el).find('a .tray-item-description .tray-item-title')
                const info = $(el).find('a .tray-item-description .tray-item-meta-info')
                const fullname = $(info).find('.tray-episode-name')
                const view = $(info).find('.tray-episode-views')

                json.push({
                    url: $(a).attr('href'),
                    thumbnail: $(img).attr('data-src'),
                    film_name: $(filmname).html(),
                    full_name: $(fullname).html(),
                    view: $(view).html()
                })
            })

            const total = json.length
            const start = p * limit - limit
            const end = p * limit
            json = json.slice(start, end > total ? total : end)

            res.json({
                success: true,
                data: {
                    total,
                    limit: 20,
                    result: json
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

    async search(req, res) {
        const q = req.body.q

        const slugify = str => {
            var slug = str

            slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a');
            slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e');
            slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i');
            slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o');
            slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u');
            slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y');
            slug = slug.replace(/đ/gi, 'd');
            slug = slug.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, '');
            slug = slug.replace(/ /gi, " - ");
            slug = slug.replace(/\-\-\-\-\-/gi, '-');
            slug = slug.replace(/\-\-\-\-/gi, '-');
            slug = slug.replace(/\-\-\-/gi, '-');
            slug = slug.replace(/\-\-/gi, '-');
            slug = '@' + slug + '@';
            slug = slug.replace(/\@\-|\-\@|\@/gi, '');

            return slug
        }

        try {
            const { data } = await axios.get(`https://vuighe.net/api/v2/search?q=${slugify(q)}&limit=12`, {
                headers: {
                    'Referer': 'https://vuighe.net/',
                    'X-Requested-With': 'XMLHttpRequest'
                }
            })

            res.json({
                success: true,
                data: data
            })
        } catch (error) {
            console.log(error)

            res.json({
                success: false,
                message: "Có lỗi xảy ra"
            })
        }
    }

    async rank(req, res) {
        try {
            const { data } = await axios.get(`https://vuighe.net/json/ranking.json`, {
                headers: {
                    'Referer': 'https://vuighe.net/',
                    'X-Requested-With': 'XMLHttpRequest'
                }
            })

            res.json({
                success: true,
                data: data
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

module.exports = new HomeController