<script>
(function(){
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var pin = document.getElementById('glubina');
  var pit = document.getElementById('pit'), bucket = document.getElementById('bucket');
  var dn = document.getElementById('dn'), tasks = [].slice.call(document.querySelectorAll('#tasks li'));
  var TOP = 40, MAXP = 416;               // 2,0 м = 416 px по шкале разреза
  var STOPS = [0.5, 1.0, 1.5, 2.0];
  function depthFor(p){                    // p 0..1 -> глубина 0..2 по четырём остановкам
    var seg = p * 3, i = Math.min(2, Math.floor(seg)), f = Math.min(1, seg - i);
    if (p >= 1) return 2.0;
    var a = STOPS[i], b = STOPS[i+1];
    return a + (b - a) * (f < .55 ? Math.min(1, f / .55) : 1);
  }
  function apply(p){
    var d = depthFor(p), h = d / 2 * MAXP;
    pit.setAttribute('height', h.toFixed(1));
    bucket.setAttribute('transform', 'translate(112,' + (TOP + h).toFixed(1) + ')');
    dn.textContent = d.toFixed(1).replace('.', ',');
    var k = d < .75 ? 0 : (d < 1.25 ? 1 : (d < 1.75 ? 2 : 3));
    tasks.forEach(function(li,i){ li.classList.toggle('on', i === k); });
  }
  if (reduce) { apply(1); return; }
  apply(0);
  var raf = false;
  function upd(){
    raf = false;
    var r = pin.getBoundingClientRect(), span = r.height - innerHeight;
    var p = span > 0 ? Math.min(1, Math.max(0, -r.top / span)) : 1;
    apply(p);
  }
  addEventListener('scroll', function(){ if(!raf){raf=true;requestAnimationFrame(upd);} }, {passive:true});
  addEventListener('resize', upd);
  upd();
})();
</script>
</body>
</html>
