import { Charts } from "./class/Charts";
import "./style.less";

const canvas = document.getElementById("canvas");

new Charts(canvas, window.innerWidth / 2, window.innerHeight / 2);
