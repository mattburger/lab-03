'use strict'

document.addEventListener('DOMContentLoaded', ()=> {

  $.get('../data/page-2.json', (data, status) => {
    let imageObjects = [];
    data.forEach((imgObj) => {
      imageObjects.push(new ImageObject(imgObj.description, imgObj.horns, imgObj.image_url, imgObj.keyword, imgObj.title))
    })
    displayImages(imageObjects);
    populateKeywords(imageObjects);
    submitHandler(imageObjects);
    showAllHandler(imageObjects);
  })
})


// constructor function
function ImageObject(description, horns, imgUrl, keyword, title){
  this.description = description,
  this.horns = horns, 
  this.imgUrl = imgUrl,
  this.keyword = keyword,
  this.title = title
};

var filterPictures = (arr, keyword) => {
  let usrSelect = [];
  $.each(arr, function(index, value){
    if(value.keyword === keyword){
      usrSelect.push(value);
    }
  });
  removeOptions();
  displayImages(usrSelect);

}
// display images function
const displayImages = (array) => {
  array.forEach((img) => {
    $('div.container2').append(`<img src="${img.imgUrl}" class="pictures" />`)
  })
}


// function to remove all option elements
var removeOptions = () => {
  $('div.container2').empty();
}

// function to add the filtered keywords
var populateKeywords = (array) => {
  let keywords = []
  $.each(array, (i, obj) => {
    if(!keywords.includes(obj.keyword)){
      keywords.push(obj.keyword)
      $('#keywords2').append(`<option value="${obj.keyword}">${firstLetterCap(obj.keyword)}</option>`)
    }
  })
}

// submit handler
var submitHandler = (array) => {
  $('#filter-form2').submit(function(e) {
    e.preventDefault();
    var val = $("#keywords2 option:selected").val();
    filterPictures(array, val)
  });
}

// show all handler
var showAllHandler = (array) => {
  $('#showAll2').submit(function(e) {
    e.preventDefault();
    removeOptions();
    displayImages(array)
  });
}

const firstLetterCap = (text) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};