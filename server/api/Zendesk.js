import axios from "axios";

class Zendesk {
  constructor(domain, maxPaging) {
    this.domain = domain;
    this.maxPaging = maxPaging;
  }

  async getHelpdeskArticles(position) {
    try {
      let articles = [];
      while (position <= this.maxPaging) {
        console.log(position, this.maxPaging);
        let response = await axios({
          url: `https://${this.domain}/api/v2/help_center/en-us/articles.json?per_page=100&page=${position}`,
          method: "get",
        });
        let results = response.data;
        if (results.page_count <= this.maxPaging) {
          this.maxPaging = results.page_count;
        }
        for (let a in results.articles) {
          let id = results.articles[a].id;
          let name = results.articles[a].name;
          // remove html
          let body = results.articles[a].body.replace(/(<([^>]+)>)/gi, "");
          // remove new lines
          body = body.replace(/  |\r\n|\n|\r/gm, " ");
          // remove tabs
          body = body.replace(/\t/g, " ");
          if (results.articles[a].outdated == false) {
            articles.push({ id, name, body });
          }
        }
        position++;
      }
      return articles;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}

export default Zendesk;
