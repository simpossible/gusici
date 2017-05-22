let instance = undefined;

export class AuthorManager {

    constructor() {

        if (instance == undefined) {
            this.authors = {};
            this.loaded = false;
            this.isloading = false;
            this.callbacks = [];            
            this.searchCallBack = [];
            instance = this;
        } else {

        }
        return instance;
    }

    getAllAuthorPic(callback) {        
        if (this.loaded == false && this.isloading == false) {
            this.isloading = true;
            let url = 'http://app.gushiwen.org/api/author/authorPicAll.aspx?token=gswapi';
            fetch(url, { method: 'GET' }).then((data) => { return data.json() }).then((json) => {
                console.log('aaa');
                this.isloading = false;
                this.authors = json.authors;                
                this.loaded = true;
                this.callbacks.map((cb) => {
                    cb(this.authors);
                });
                this.callbacks = [];//回调
                
                this.searchCallBack.map((cb) => {                    
                    this.getPicUriByName(cb.name, cb.callback);
                });
                this.searchCallBack = [];
            });
        } else if (this.loaded == false && this.isloading == true) {
            this.callbacks.push(callback);
        } else {
            callback(this.authors);
        }

    }

    getPicUriByName(name, callback) {

        if (this.isloading == true || this.loaded == false) {        
            this.searchCallBack.push({ name: name, callback: callback });
        } else {            
            for (var i = 0; i < this.authors.length; i++) {
                let item = this.authors[i];                
                if (item.nameStr == name) {                    
                    callback(item.pic);                    
                    return item.pic;
                }
            }
        }
    }
}