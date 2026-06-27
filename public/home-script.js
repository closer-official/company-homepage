(function(){
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var intro=document.getElementById('intro'),head=document.getElementById('head');
  function start(){
    document.body.classList.add('ready');
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:.14,rootMargin:'0px 0px -7% 0px'});
    document.querySelectorAll('.reveal').forEach(function(el){io.observe(el);});
    var stickyCta=document.getElementById('sticky-cta');
    var onScroll=function(){
      head.classList.toggle('solid',window.scrollY>40);
      if(stickyCta){
        var show=window.scrollY>300;
        stickyCta.classList.toggle('visible',show);
        document.body.classList.toggle('sticky-visible',show);
      }
    };
    onScroll();window.addEventListener('scroll',onScroll,{passive:true});
  }
  if(reduce){if(intro)intro.style.display='none';start();return;}
  if(!intro){start();return;}
  setTimeout(function(){intro.classList.add('lift');setTimeout(function(){intro.remove();start();},760);},1750);
  setTimeout(function(){if(document.getElementById('intro')){intro.remove();start();}},4500);
})();
