(function() {
    var d = document, s = d.createElement('script');
    s.src = 'https://justatest-2.disqus.com/embed.js';
    if (document.querySelector('#disqus_thread')) {
        s.setAttribute('data-timestamp', +new Date());
        (d.head || d.body).appendChild(s);   
    }
})();