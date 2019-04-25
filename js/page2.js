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
  let sortedArray = sortByKeyword(array);
  console.log('keyword sort',sortedArray);
  sortedArray = sortByHorns(sortedArray);
  console.log('horn sort',sortedArray); //

 /* sortedArray.forEach((img) => {

  })*/
  // array.forEach((img) => {
    // $('div.container2').append(`<img src="${img.imgUrl}" class="pictures" />`)
  // })
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


let sortByKeyword = (arr) => {
  console.log(arr[2].keyword);
  arr.sort( (a, b) => {
    return a.keyword.localeCompare(b.keyword);
  });
  console.log(arr)
  return arr;
}
// let sortByKeyword = (arr) => {
//   arr.sort( (a,b) => {
//     let aa = a['keyword'];
//     let bb = b['keyword'];
//     if(aa < bb){
//       return -1;
//     }
//     else if(aa == bb){
//       return 0;
//     }
//     else{
//       return 1;
//     }
//   });
//   return arr;
// }

let sortByHorns = (arr) => {
  arr.sort( (a,b) => { 
    let aa = a['horns'];
    let bb = b['horns'];
    return aa - bb;
  });
  return arr;
}
