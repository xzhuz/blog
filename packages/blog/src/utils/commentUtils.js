import Gitalk from 'gitalk';

export function getGitTalk(pathname) {
    return new Gitalk({
        clientID: 'e4f6d691b0d289aed39a',
        clientSecret: '7a16a75276eba5e96c05164f6dd41c9a9bdf3c00',
        repo: 'blog-gitment',
        owner: 'xebcxc',
        admin: ['xebcxc'],
        id: pathname,      // Ensure uniqueness and length less than 50
        distractionFreeMode: false  // Facebook-like distraction free mode
    });
}

export function prefixInteger(num, n) {
    return (Array(n).join(0) + num).slice(-n);
}

export function formatDate(date) {
    const blogDate = new Date(date);
    const year = blogDate.getFullYear();
    const month = prefixInteger(blogDate.getMonth() + 1, 2);
    const day = prefixInteger(blogDate.getUTCDate(), 2);
    const timeString = blogDate.toLocaleTimeString('chinese', { hour12: false });
    return `${year}年${month}月${day}日 ${timeString}`;
}

export function dateFormat(date) {
    const blogDate = new Date(date);
    const year = blogDate.getFullYear();
    const month = prefixInteger(blogDate.getMonth() + 1, 2);
    const day = prefixInteger(blogDate.getUTCDate(), 2);
    return `${year}-${month}-${day}`;
}