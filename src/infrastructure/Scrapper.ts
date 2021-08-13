import axios from 'axios';
import cheerio from 'cheerio';
const url = 'https://www.amazon.com.mx/gp/bestsellers/?ref_=nav_cs_bestsellers'; // URL we're scraping
const AxiosInstance = axios.create(); // Create a new Axios Instance


export async function getDataScrapper() {
  try {
    let response = await AxiosInstance.get(url)
    const html = response.data;
    const $ = cheerio.load(html);
    let products = []
    $('#zg_left_col1 .zg_homeWidget').each((i, elem) => {
      let scraper = {
        category:'',
        products:[]
      }
      let category = $(elem).find('h3').text()
      scraper.category = category
      $(elem).find('.zg_item').each((i, elemt) => {
        let product={
          coverImage: '',
          author:'',
          name: '',
          rating:{
            value: '',
            total:''
          }
        }
          product.coverImage = $(elemt).find('div.a-spacing-none a.a-link-normal div.a-section img').attr('src');
          product.author = $(elemt).find('div.a-spacing-none div.a-row span.a-size-small').html()
          product.name = $(elemt).find('div.a-spacing-none a.a-link-normal div.p13n-sc-truncate').html().trim()
          product.rating.value= $(elemt).find('div.a-spacing-none div.a-icon-row a.a-link-normal i.a-icon span.a-icon-alt').html()
          product.rating.total=   $(elemt).find('div.a-spacing-none div.a-icon-row a.a-size-small').html()
          scraper.products.push(product)
      })
      products.push(scraper)
    })
    return products
  } catch (error) {
    throw 404;
  }
}
