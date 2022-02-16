export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# Touching the Stars Interface`
)});
  main.variable(observer("viewof button")).define("viewof button", ["Inputs"], function(Inputs){return(
Inputs.button("Click me", {})
)});
  main.variable(observer("button")).define("button", ["Generators", "viewof button"], (G, _) => G.input(_));
  main.variable(observer("viewof range")).define("viewof range", ["Inputs"], function(Inputs){return(
Inputs.range([0, 100], {label: "Amount"})
)});
  main.variable(observer("range")).define("range", ["Generators", "viewof range"], (G, _) => G.input(_));
  main.variable(observer("viewof radios")).define("viewof radios", ["Inputs"], function(Inputs){return(
Inputs.radio(["A", "B"], {label: "Select one"})
)});
  main.variable(observer("radios")).define("radios", ["Generators", "viewof radios"], (G, _) => G.input(_));
  main.variable(observer("state")).define("state", ["button","range","radios"], function(button,range,radios){return(
{
  button,
  range,
  radios
}
)});
  main.variable(observer()).define(["state"], function(state)
{
  fetch("http://192.168.2.103:8003", {
    method: "POST",
    body: JSON.stringify(state)
  }).catch((e) => console.log(e));
}
);
  return main;
}
