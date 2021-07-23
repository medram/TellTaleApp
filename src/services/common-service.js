import axios from 'axios'
import { showMessage } from 'react-native-flash-message'
import { BASE_URL } from '../configs/api'
import { jsdom } from 'jsdom-jscore-rn'



export async function getGames(email, password) {
    try
    {
        const req = await axios.get(`${BASE_URL}/category/games/`)

        if (req.status === 200)
        {
            // const { jsdom } = require('jsdom-jscore-rn')
            const htmlDom = jsdom(req.data)
            let articles = Array.from(htmlDom.querySelectorAll('article'))

            articles = articles.map(art => {
                let title = (art.querySelector("h3.elementor-post__title").querySelector('a')).textContent.trim()
                let post_image = (art.querySelector("div.elementor-post__thumbnail img")).getAttribute('src')
                let url = (art.querySelector("a.elementor-post__thumbnail__link")).getAttribute('href')

                return {title, post_image, url};
            })

            return articles
        }

    } catch (err) {
        console.log(err)
        showMessage({
            message: 'Oops!, Something went wrong.',
            type: 'warning'
        })
    }
    return [] // no articles found
}

export async function getNews()
{
    try {
        const req = await axios.get(`${BASE_URL}/category/news/`)

        if (req.status === 200) {
            // const { jsdom } = require('jsdom-jscore-rn')
            const htmlDom = jsdom(req.data)
            let articles = Array.from(htmlDom.querySelectorAll('article'))

            articles = articles.map(art => {
                let title = (art.querySelector("h3.elementor-post__title").querySelector('a')).textContent.trim()
                let post_image = (art.querySelector("div.elementor-post__thumbnail img")).getAttribute('src')
                let url = (art.querySelector("a.elementor-post__thumbnail__link")).getAttribute('href')

                let meta_data = Array.from(art.querySelector('div.elementor-post__meta-data').children).map(child => child.innerHTML.trim())

                return { title, post_image, url, extra: meta_data };
            })

            return articles
        }

    } catch (err) {
        console.log(err)
        showMessage({
            message: 'Oops!, Something went wrong.',
            type: 'warning'
        })
    }
    return [] // no articles found
}

export async function getGamesDetailt(url)
{
    try {
        const req = await axios.get(url)

        if (req.status === 200) {
            // const { jsdom } = require('jsdom-jscore-rn')
            const htmlDom = jsdom(req.data)
            const head =  htmlDom.querySelector('head').innerHTML
            const content = htmlDom.querySelector('div#content').outerHTML
            const footer = htmlDom.querySelector('footer').outerHTML
            const scripts = Array.from(htmlDom.querySelectorAll('script')).map(script => script.outerHTML)

            return `<html>
                        <head>
                            ${head}
                            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
                        </head>
                        <body>
                            ${content}
                            ${footer}
                            ${scripts}
                        </body>
                    </html>`
        }
    } catch (err) {
        console.log(err)
        showMessage({
            message: 'Oops!, Something went wrong.',
            type: 'warning'
        })
    }
    return ""
}

export async function getAllGames()
{
    try {
        const res = await axios.get('https://account.telltale.com/account/box-art-assets.json')
        if (res.status === 200) {
            return res.data
        }
    } catch (err) {
        console.log(err)
        showMessage({
            message: 'Oops!, Something went wrong.',
            type: 'warning'
        })
    }
    return []
}

export async function getMyGames()
{
    try
    {
        const res = await axios.get('/entitlement')
        const allGames = await getAllGames()

        if (res.status === 200)
        {
            const data = (res.data?.entitlements?.length && res.data.entitlements) || []
            const slugs = data.map(d => d.game)
            // return allGames
            // return []
            return allGames.filter(game => {
                return slugs.includes(game.slug)
            })
        }
    } catch (err){
        console.log(err)
        showMessage({
            message: 'Oops!, Something went wrong.',
            type: 'warning'
        })
    }
    return []
}

export async function getGameDetail(gameSlug)
{
    try {
        const res = await axios.get(`https://api.telltale.com/3/cloudsave/${gameSlug}/choices`)
        if (res.status === 200) {
            return res.data
        }
    } catch (err) {
        console.log(err)
        showMessage({
            message: 'Oops!, Something went wrong.',
            type: 'warning'
        })
    }
    return []
}
