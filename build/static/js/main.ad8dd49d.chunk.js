(this.webpackJsonpleaderboard=this.webpackJsonpleaderboard||[]).push([[0],{17:function(e,t,a){e.exports=a(43)},22:function(e,t,a){},41:function(e,t,a){},42:function(e,t,a){e.exports=a.p+"static/media/Reveille-TAMU-Mascot.817d08fb.jpg"},43:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(12),c=a.n(l),o=(a(22),a(23),a(2)),s=a.n(o),i=(a(41),a(13)),d=a(14),m=a(16),u=a(15),h=function(e){Object(m.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(i.a)(this,a),(n=t.call(this,e)).state={leaderboard:[]},n}return Object(d.a)(a,[{key:"componentDidMount",value:function(){var e=this;s.a.get("http://45.63.0.107:3000/leaderboard").then((function(t){console.log(t),e.setState({leaderboard:t.data})})).catch((function(e){console.log(e)}))}},{key:"render",value:function(){var e=this.state.leaderboard;return r.a.createElement("div",null,r.a.createElement("h2",{class:"top-detective"},"Miss Reveille extends her Commendations to these Aggies!"),r.a.createElement("div",{class:"all-leaderboard"},r.a.createElement("table",{class:"leaderboard"},r.a.createElement("tr",{class:"leaderboard-headers"},r.a.createElement("th",{class:"leaderboard-header"},"Name"),r.a.createElement("th",{class:"leaderboard-header-places"},"AggieSites Found")),e.length?e.map((function(e){return r.a.createElement("tr",{class:"detective",key:e.username},r.a.createElement("td",{class:"detective-name"},e.username),r.a.createElement("td",{class:"places-found"},e.visitedPlaces))})):null)))}}]),a}(n.Component);a(42);var v=function(){return r.a.createElement("div",{className:"App"},r.a.createElement("div",{class:"top-bar-thingy"}),r.a.createElement("div",{class:"reveille-anti-transparent"}),r.a.createElement("div",{class:"reveille-container"}),r.a.createElement("div",null,r.a.createElement("h1",{className:"title"},"Top Detective Leaderboard")),r.a.createElement(h,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(v,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[17,1,2]]]);
//# sourceMappingURL=main.ad8dd49d.chunk.js.map