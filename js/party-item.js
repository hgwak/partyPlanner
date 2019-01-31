/** Class representing a party item (e.g. music selection, appetizer recipe) */
class PartyItem {

    /**
     * @constructor
     * @param {string} id - ID of this item per its source API
     * @param {string} name - Name of this item
     * @param {string} imageURL - Image URL for this item
     * @param {*} eventCallback - Callback when item is clicked in DOM
     * @param {{}} props - Additional type-specific properties (ex: recipe ingredients)
     */
    constructor(id, name, imageURL, eventCallback, props) {
        this.id = id;
        this.name = name;
        this.imageURL = imageURL;
        this.eventCallback = eventCallback;
        this.props = props;
    }

    /**
     * @param {boolean} selected - Whether or not this is currently selected
     * @returns {*} jQuery wrapper containing a Materialize card with high-level info for this item
     */
    renderSearch(selected) {
        // SEE: Horizontal Cards at https://materializecss.com/cards.html
        let card = $('<div>').addClass('card horizontal');

        if (selected) {
            card.addClass('selected');
        }

        let cardImage = $('<div>')
            .addClass('card-image')
            .appendTo(card);

        let image = $('<img>')
            .addClass('searchImage')
            .attr('src', this.imageURL)
            .appendTo(cardImage);

        let cardStacked = $('<div>')
            .addClass('card-stacked')
            .appendTo(card);
        let cardContent = $('<div>')
            .addClass('card-content')
            .appendTo(cardStacked).css({'display':'flex'});//'padding':'0px'

        let titleLink = $('<a>')
            .addClass('titleLink')
            .appendTo(cardContent);

        let title = $('<p>')
            .addClass('searchTitle')
            .text(this.name)
            .appendTo(titleLink);



        //card reveal
        let cardReveal = $('<div>')
            .addClass('card-reveal')
            .appendTo(card);

        let revealTitle = $('<span>')
            .addClass('class-title')
            .text(this.name)
            .appendTo(cardReveal);

        let closeButton = $('<i>')
            .addClass('material-icons right close')
            .text('close')
            .appendTo(revealTitle);

        let revealContent = $('<p>')
            .text('Please put in description')
            .appendTo(cardReveal);

        let buttonDef = selected ? 
            {label:'delete', colors: 'pink lighten-2'} :
            {label:'add', colors: 'purple lighten-2'};

        let buttonContainer = $('<a>')
            .addClass('btn waves-effect waves-light buttonStyle ' + buttonDef.colors)
            .appendTo(cardContent);

        let button = $('<i>')
            .addClass('material-icons')
            .text(buttonDef.label)
            .appendTo(buttonContainer);

        let revealIcon = $('<i>')
            .addClass('material-icons right activator')
            .text('more_vert')
            .appendTo(cardContent);

        title.click(target => this.eventCallback(this, 'view'));
        button.click(target => {
            card.fadeOut(() => card.remove());
            this.eventCallback(this, buttonDef.label);
        });
        closeButton.click(() => cardReveal.hide());
        return card;
    }
}

/** Class representing a recipe-type party item */
class RecipeItem extends PartyItem {

    /**
     * @returns jQuery wrapper with DOM showing details of this recipe
     */
    renderDetails(){
        let container = $('<div>')
            .addClass('displayContainer');

        let title = $('<h3>')
            .addClass('detailsTitle')
            .text(this.name);

        let imageContainer = $('<div>')
            .addClass('listImageContainer');

        let image = $('<img>')
            .addClass('detailsImage')
            .attr('src', this.imageURL);

        let infoContainer = $('<div>')
            .addClass('listContentContainer');

        let ingredientList = $('<ul>')
            .addClass('ingredientList');

        for(let i = 0; i < this.props.ingredients.length; i++){
            let ingredients = $('<li>')
                .addClass('ingredients')
                .text(this.props.ingredients[i]);
            ingredientList.append(ingredients);
        }

        let instructions = $('<p>')
            .addClass('recipe')
            .text(this.props.instructions);

        imageContainer.append(image);
        infoContainer.append(ingredientList, instructions)
        container.append(title, imageContainer, infoContainer)
        
        return container;
    }
}

/** Class representing a video-type party item */
class VideoItem extends PartyItem {

    /**
     * @returns jQuery wrapper with DOM showing this video/details
     */
    renderDetails(){
        let container = $('<div>')
            .addClass('displayContainer')
            .css('height', '95%');

        let video = $('<iframe>')
            .attr({
                type: 'text/html',
                width: '80%',
                height: '90%',
                src: `https://www.youtube.com/embed/${this.id}`,
                fs: '1'
            })
            .css({
                position: 'relative',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -55%)'
            });
        container.append(video);

        return container;
    }
}