// MAIN FUNCTIONS start
const getSelector = (selector) => document.querySelector(selector), // get element by selector
  getId = (id) => document.getElementById(id), // get element by id
  rndNmb = (min, max) => Math.round(min + Math.random() * (max - min)), // generate random number
  gColor = () => `rgb(${rndNmb(0, 255)}, ${rndNmb(0, 255)}, ${rndNmb(0, 255)})`; // generate random color
// MAIN FUNCTIONS end

// MAIN BLOCKS start
const topBlock = getSelector(".top-block"),
  styleBlock = getSelector(".style-block"),
  editBlock = getSelector(".edit-block"),
  editArea = getSelector(".edit-area"),
  colorsBlock = getSelector(".colors"),
  formAdd = document.forms.formAdd,
  formList = document.forms.formList,
  formTable = document.forms.formTable;
// MAIN BLOCKS end

// EDIT SECTION start
// edit button start
getSelector(".btn-edit").addEventListener("click", function () {
  styleBlock.classList.remove("show");
  editBlock.classList.add("show");
  editArea.value = topBlock.innerHTML;
});
// edit button end

// save button start
getSelector(".btn-save").addEventListener("click", function () {
  editBlock.classList.remove("show");
  topBlock.innerHTML = editArea.value;
  editArea.value = "";
});
// save button end
// EDIT SECTION end

// STYLE SECTION start
// style button start
getSelector(".btn-style").addEventListener("click", function () {
  editBlock.classList.remove("show");
  styleBlock.classList.add("show");
});
// style button end

// set font size start
getSelector(".font-size").addEventListener("change", (e) => (topBlock.style.fontSize = e.target.value));
// set font size end

// set font family start
getId("fontFamily").addEventListener("change", (e) => (topBlock.style.fontFamily = e.target.value));
// set font family end

let colors = ["white", gColor(), gColor(), gColor(), gColor(), gColor(), gColor(), gColor(), "black"];

// set font color start
const setColor = function () {
  topBlock.style.color = this.style.backgroundColor;
  colorsBlock.classList.add("hide");
  for (let i = 0; i < colorsBlock.children.length; i++) {
    colorsBlock.children[i].removeEventListener("click", setColor);
  }
};
getSelector(".btn-text-color").addEventListener("click", function () {
  colorsBlock.classList.remove("hide");
  for (let i = 0; i < colorsBlock.children.length; i++) {
    colorsBlock.children[i].style.backgroundColor = colors[i];
    colorsBlock.children[i].addEventListener("click", setColor);
  }
});
// set font color end

// set background color start
const setBgColor = function () {
  topBlock.style.backgroundColor = this.style.backgroundColor;
  colorsBlock.classList.add("hide");
  for (let i = 0; i < colorsBlock.children.length; i++) {
    colorsBlock.children[i].removeEventListener("click", setBgColor);
  }
};
getSelector(".btn-bg-color").addEventListener("click", function () {
  colorsBlock.classList.remove("hide");
  for (let i = 0; i < colorsBlock.children.length; i++) {
    colorsBlock.children[i].style.backgroundColor = colors[i];
    colorsBlock.children[i].addEventListener("click", setBgColor);
  }
});
// set background color

// set bold style start
getId("boldCheck").addEventListener("click", function (e) {
  e.target.checked ? topBlock.classList.add("bold") : topBlock.classList.remove("bold");
});
// set bold style end

// set italic style start
getId("cursiveCheck").addEventListener("click", function (e) {
  e.target.checked ? topBlock.classList.add("cursive") : topBlock.classList.remove("cursive");
});
// set italic style end
// STYLE SECTION end

// ADD SECTION start
// show create screen start
getSelector(".btn-add").onclick = function () {
  getSelector(".first").classList.remove("show");
  getSelector(".second").classList.add("show");
};
// show create screen end

// choose what to create start
formAdd.addEventListener("change", (e) => {
  if (e.target.value === "table") {
    getSelector(".create-list").classList.remove("show");
    getSelector(".create-table").classList.add("show");
  } else if (e.target.value === "list") {
    getSelector(".create-table").classList.remove("show");
    getSelector(".create-list").classList.add("show");
  }
});
// choose what to create end

// create list start
getSelector(".btn-create-list").onclick = function () {
  let liCount = formList["list-count"].value,
    ulType = formList["list-type"].value;
  if (liCount >= 1) {
    editArea.value += `<ul style="list-style-type: ${ulType};">`;
    for (let i = 0; i < liCount; i++) {
      editArea.value += `<li>Item ${i + 1}</li>`;
    }
    editArea.value += "</ul>";
    getSelector(".first").classList.add("show");
    getSelector(".second").classList.remove("show");
  }
};
// create list end

// create table start
getSelector(".btn-create-table").onclick = function () {
  let trCount = formTable["tr-count"].value,
    tdCount = formTable["td-count"].value,
    tdWidth = formTable["td-width"].value,
    tdHeight = formTable["td-height"].value,
    bdWidth = formTable["border-width"].value,
    bdStyle = formTable["table-border-style"].value,
    bdColor = formTable["table-border-color"].value;

  if (trCount >= 1 && tdCount >= 1 && tdWidth >= 1 && tdHeight >= 1 && bdWidth >= 0) {
    editArea.value += `<table>`;
    for (let i = 0; i < trCount; i++) {
      editArea.value += `<tr>`;
      for (let a = 0; a < tdCount; a++) {
        editArea.value += `<td style="width:${tdWidth}px; height:${tdHeight}px; border: ${bdWidth}px ${bdStyle} ${bdColor};">TD ${i + 1}.${a + 1
          }</td>\n`;
      }
      editArea.value += `</tr>\n`;
    }
    editArea.value += "</table>";
    getSelector(".first").classList.add("show");
    getSelector(".second").classList.remove("show");
  }
};
// create table end
// ADD SECTION end