let age = document.getElementById("age");
function showUser(surname, name) {
  alert("Пользователь " + surname + " " + name + ", его возраст " + age.value);
}
showUser.apply(age, ["Trofimov", "Dmitriy"]);

class Options {
  constructor(height, width, bg, fontSize, textAlign) {
    this.height = height;
    this.width = width;
    this.bg = bg;
    this.fontSize = fontSize;
    this.textAlign = textAlign;
  }
  createDiv() {
    let div = document.createElement("div");
    div.textContent = "Привет!";
    document.body.appendChild(div);
    div.style.cssText = `height: ${this.height}px; width: ${this.width}px; background: ${this.bg}; font-size: ${this.fontSize}px; text-align: ${this.textAlign};`;
  }
}
let newDiv = new Options(100, 100, "red", 20, "center");
newDiv.createDiv();
let anotherDiv = new Options(400, 300, "green", 30, "left");
anotherDiv.createDiv();
