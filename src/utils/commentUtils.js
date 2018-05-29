import Gitalk from 'gitalk';

export function getGitTalk(pathname) {
    return new Gitalk({
        clientID: 'e4f6d691b0d289aed39a',
        clientSecret: '7a16a75276eba5e96c05164f6dd41c9a9bdf3c00',
        repo: 'blog-gitment',
        owner: 'mrmeisen',
        admin: ['mrmeisen'],
        id: pathname,      // Ensure uniqueness and length less than 50
        distractionFreeMode: false  // Facebook-like distraction free mode
    });
}
