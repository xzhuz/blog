import Gitalk from 'gitalk';

export function getGitTalk(pathname, host) {
    const client = host.includes('www') ?
        {
            clientID: '770ac9c98805821fef31',
            clientSecret: 'e6d1895fa9ce3474228b0bb4f52602dcb02f5e34',
        } :
        {
            clientID: 'e4f6d691b0d289aed39a',
            clientSecret: '7a16a75276eba5e96c05164f6dd41c9a9bdf3c00',
        };
    return new Gitalk({
        ...client,
        repo: 'blog-gitment',
        owner: 'mrmeisen',
        admin: ['mrmeisen'],
        id: pathname,      // Ensure uniqueness and length less than 50
        distractionFreeMode: false  // Facebook-like distraction free mode
    });
}
