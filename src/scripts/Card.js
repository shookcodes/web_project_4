
export default class Card {
    constructor({data, template, handleCardClick, handleDeleteCardClick, handleLikeCardClick}, userId) {
        this.data = data;
        this._name = data.name;
        this._link = data.link;
        this._id = data._id;
        this._userId = userId;
        this._owner = data.owner;
        this._likes = data.likes;
        this._template = template;
        this._handleCardClick = handleCardClick;
        this._handleDeleteCardClick = handleDeleteCardClick;
        this._handleLikeeCardClick = handleLikeCardClick;
    }

    generateCard() {
        const cardTemplate = document
            .querySelector(this._template)
            .content.querySelector(".card");
        this._cardElement = cardTemplate.cloneNode(true);

        this._cardImage = this._cardElement.querySelector(".card__image");
        this._cardElement.querySelector(".card__title").textContent = this._name;
        
        this._cardImage.setAttribute('src', this._link); 
        this._cardImage.setAttribute('alt', this._name);  
        this._cardButton = this._cardElement.querySelector(".btn_style_like")
        this._cardLike = this._cardElement.querySelector(".card__like-text");
        
 
        this._showDeleteButton();
        this._setEventListeners();
        this.showCardLikes();
        
     
        return this._cardElement;
    }

    _showDeleteButton() {
        this._deleteBtn = this._cardElement.querySelector(".btn_style_delete");
        
        if (this._userId === this._owner._id) {
            this._deleteBtn.classList.add("btn_style_delete-active")
        }
    }

    showCardLikes() {
        this._cardLike.textContent = this._likes.length;    
            if (this.cardLiked()) {
                this._cardButton.classList.add("btn_style_like-active")
            } else {
                this._cardButton.classList.remove("btn_style_like-active")
             
            }
    }

    

    cardLiked() {
        return this._likes.some(item => item._id === this._userId
        )
    }

    updateCardLikes(likes) {
        this._likes = likes;
        this.showCardLikes();
    }
    


    _openImage(name, link) {
        this._handleCardClick;

    }

    deleteCard() {
        this._cardElement.remove();
    }


    _setEventListeners() {
        const likeBtn = this._cardElement.querySelector(".btn_style_like");
        
        const cardImage = this._cardElement.querySelector(".card__image");
        

        likeBtn.addEventListener("click", () => {
            this._handleLikeeCardClick(this._id)
            
        console.log(this._id)
        });
        cardImage.addEventListener("click", () => {this._handleCardClick(this._name, this._link);
            
        });;
     
          
        this._deleteBtn.addEventListener("click", () => {this._handleDeleteCardClick(this._id)
        })
        
    }
}
