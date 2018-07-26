import { parse } from 'url';

const titles = [
  'Alipay',
  'Angular',
  'Ant Design',
  'Ant Design Pro',
  'Bootstrap',
  'React',
  'Vue',
  'Webpack',
];
const avatars = [
  'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png', // Alipay
  'https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png', // Angular
  'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png', // Ant Design
  'https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png', // Ant Design Pro
  'https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png', // Bootstrap
  'https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png', // React
  'https://gw.alipayobjects.com/zos/rmsportal/ComBAopevLwENQdKWiIn.png', // Vue
  'https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png', // Webpack
];

const covers = [
  'https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png',
  'https://gw.alipayobjects.com/zos/rmsportal/iZBVOIhGJiAnhplqjvZW.png',
  'https://gw.alipayobjects.com/zos/rmsportal/uVZonEtjWwmUZPBQfycs.png',
  'https://gw.alipayobjects.com/zos/rmsportal/gLaIAoVWTtLbBWZNYEMg.png',
];
const desc = [
  '那是一种内在的东西， 他们到达不了，也无法触及的',
  '希望是一个好东西，也许是最好的，好东西是不会消亡的',
  '生命就像一盒巧克力，结果往往出人意料',
  '城镇中有那么多的酒馆，她却偏偏走进了我的酒馆',
  '那时候我只会想自己想要什么，从不想自己拥有什么',
];

const user = [
  '付小小',
  '曲丽丽',
  '林东东',
  '周星星',
  '吴加好',
  '朱偏右',
  '鱼酱',
  '乐哥',
  '谭小仪',
  '仲尼',
];

export function fakeList(count) {
  const list = [];
  for (let i = 0; i < count; i += 1) {
    list.push({
      id: `fake-list-${i}`,
      owner: user[i % 10],
      title: titles[i % 8],
      avatar: avatars[i % 8],
      cover: parseInt(i / 4, 10) % 2 === 0 ? covers[i % 4] : covers[3 - (i % 4)],
      status: ['active', 'exception', 'normal'][i % 3],
      percent: Math.ceil(Math.random() * 50) + 50,
      logo: avatars[i % 8],
      href: 'https://ant.design',
      update: new Date(new Date().getTime() - 1000 * 60 * 60 * 2 * i),
      createdAt: new Date(new Date().getTime() - 1000 * 60 * 60 * 2 * i),
      subDescription: desc[i % 5],
      description:
        '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。',
      activeUser: Math.ceil(Math.random() * 100000) + 100000,
      newUser: Math.ceil(Math.random() * 1000) + 1000,
      star: Math.ceil(Math.random() * 100) + 100,
      like: Math.ceil(Math.random() * 100) + 100,
      message: Math.ceil(Math.random() * 10) + 10,
      content:
        '段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。',
      members: [
        {
          avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png',
          name: '曲丽丽',
        },
        {
          avatar: 'https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png',
          name: '王昭君',
        },
        {
          avatar: 'https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png',
          name: '董娜娜',
        },
      ],
    });
  }

  return list;
}

export function getFakeList(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const params = parse(url, true).query;

  const count = params.count * 1 || 20;

  const result = fakeList(count);

  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}

export const getNotice = [];

export const getActivities = [];

export const getPopularArticles = [
  {
    id: '0129f09dcd5c4cb8a09b0a2c18e60b66',
    title: '测试测试一',
    description: '这个其实就是一个描述',
    member: 'test',
    update: new Date(1527600200000),
    memberLink: '',
  },
  {
    id: '103856f8f513416ca10ff7e19a3df7f3',
    title: 'Hello Blog',
    description:
      '新的旅程又要开始了，这是个人博客站第一篇博客，最开始总得说点什么，按照惯例总得有个序言。下面我们一起开始新旅程吧！',
    member: 'Java',
    update: new Date(1530623072000),
    memberLink: '',
  },
  {
    id: '121fe5ecb25c4334a5a59c32476655b7',
    title: '测试测试一',
    description: '这个其实就是一个描述',
    member: '慢加载',
    update: new Date(1527600200000),
    memberLink: '',
  },
  {
    id: '287fafbc55f44371886e6407aaf67eda',
    title: '测试测试一',
    description: '这个其实就是一个描述',
    member: '慢加载',
    update: new Date(1527600200000),
    memberLink: '慢加载',
  },
  {
    id: '287fafbc55f44371886e6407aaf67ed3',
    title: '测试测试一',
    description: '这个其实就是一个描述',
    member: '慢加载',
    update: new Date(1527600200000),
    memberLink: '慢加载',
  },
];

export const getAllArticles = [
  {
    id: '0129f09dcd5c4cb8a09b0a2c18e60b66',
    title: '测asdas试一',
    description: '这个其实就是一个描述',
    member: 'test',
    memberLink: 'test',
    publish: false,
    content: '测试，ce\\n其实这个应该有评论的',
    visit: 0,
    compliment: 2,
    date: new Date(1527600200000),
    update: new Date(1527600200000),
  },
  {
    id: '0129f09dcd5c4cb8a09b0a2s18e60b66',
    title: '测fddd试一',
    description: '这个其实就是一个描述',
    member: 'test',
    memberLink: 'test',
    publish: false,
    content: '测试，ce\\n其实这个应该有评论的',
    visit: 0,
    compliment: 2,
    date: new Date(1527600200000),
    update: new Date(1527600200000),
  },
  {
    id: '0129f09dcd5c4cb8a09b0a2c18e60b66',
    title: '测试ds一',
    description: '这个其实就是一个描述',
    member: 'test',
    memberLink: 'test',
    publish: false,
    content: '测试，ce\\n其实这个应该有评论的',
    visit: 0,
    compliment: 2,
    date: new Date(1527600200000),
    update: new Date(1527600200000),
  },
  {
    id: '0129f09dcd5c4cb8a19b0a2c18e60b66',
    title: 'd试测试一',
    description: '这个其实就是一个描述',
    member: 'test',
    memberLink: 'test',
    publish: false,
    content: '测试，ce\\n其实这个应该有评论的',
    visit: 0,
    compliment: 2,
    date: new Date(1527600200000),
    update: new Date(1527600200000),
  },
  {
    id: '0129f09dcd5c4cb8g09b0a2c18e60b66',
    title: '测sdasd试一',
    description: '这个其实就是一个描述',
    member: 'test',
    memberLink: 'test',
    publish: false,
    content: '测试，ce\\n其实这个应该有评论的',
    visit: 0,
    compliment: 2,
    date: new Date(1527600200000),
    update: new Date(1527600200000),
  },
  {
    id: '0129f09dcd5c4cb8a0930a2c18e60b66',
    title: '测试asdasd一',
    description: '这个其实就是一个描述',
    member: 'test',
    memberLink: 'test',
    publish: false,
    content: '测试，ce\\n其实这个应该有评论的',
    visit: 0,
    compliment: 2,
    date: new Date(1527600200000),
    update: new Date(1527600200000),
  },
  {
    id: '0129f09dcd5c4cb8awsb0a2c18e60b66',
    title: '测试asdSAD一',
    description: '这个其实就是一个描述',
    member: 'test',
    memberLink: 'test',
    publish: true,
    content: '测试，ce\\n其实这个应该有评论的',
    visit: 0,
    compliment: 2,
    date: new Date(1527620200000),
    update: new Date(1527600200000),
  },
  {
    id: '0129f09dcd5c4cb8a09boa2c18e60b66',
    title: '皖鲁大师一',
    description: '这个其实就是一个描述',
    member: 'test',
    memberLink: 'test',
    publish: true,
    content: '测试，ce\\n其实这个应该有评论的',
    visit: 0,
    compliment: 20,
    date: new Date(1527600120000),
    update: new Date(1527600200000),
  },
  {
    id: '0129f09dcd5c4cb8a09b0a2c18e60b66',
    title: '测试测试一',
    description: '这个其实就是一个描述',
    member: 'test',
    memberLink: 'test',
    publish: true,
    content: '测试，ce\\n其实这个应该有评论的',
    visit: 10,
    compliment: 12,
    date: new Date(1527603200000),
    update: new Date(1527600200000),
  },
];

export const getArticle = {
  id: '0129f09dcd5c4cb8a09b0a2c18e60b66',
  title: '测试测试一',
  summary: '这个其实就是一个描述',
  tags: 'test, java, 干货, 我也不知道为什么',
  publish: true,
  content:
    '> 作为前端小白，从项目计划，开发和上线历经2个月，上线啦??\n' +
    '\n' +
    '&emsp;之前有通过*GitHub Page*搭建博客的经历，但是由于个人原因(~~懒~~)并没有持续更新博客，以至于到博客到现在也只写了两篇文章，想想还是很可惜的。而搭建本博客网站一方面是想自己可以做自己喜欢的事情，另一方面就是对平常自己学习的一些总结。\n' +
    '\n' +
    '说了这么多，下面还是来讲讲博客本身吧。\n' +
    '\n' +
    '## 技术栈\n' +
    '\n' +
    ' - 前端： [React ](https://reactjs.org/)、[React-Redux](https://redux.js.org/)、[React-Router v4](https://github.com/ReactTraining/react-router)、 [Webpack](http://webpack.github.io/)\n' +
    ' - 后端：[Spring Boot 2.0](https://projects.spring.io/spring-boot/)、[MySQL](https://www.mysql.com/、[Druid](https://github.com/alibaba/druid)、[Redis](http://redisdoc.com)\n' +
    ' - 服务器：[Nginx](http://nginx.org/en/)\n' +
    ' - Markdown渲染：[Marked](https://github.com/markedjs/marked)、 [Highlight.js](https://github.com/isagalaev/highlight.js)\n' +
    ' - 富文本编辑器： [Simplemde-markdown-editor](https://github.com/sparksuite/simplemde-markdown-editor)\n' +
    '\n' +
    '### 技术选型\n' +
    '\n' +
    '&emsp;  对于前端的技术选型，本人比较喜欢React，所有用了React相关技术栈，用Facebook官方提供的脚手架*create-react-app*，状态管理组件选择和React最搭配的*Redux*，路由选择同样也是选择了和React最搭配的*React-Router*。基本上算是React全家桶了，目前版本的框架还是十分的简单，后期也是有优化计划的。\n' +
    '\n' +
    '&emsp; 对于后端([Blog Server](https://github.com/mrmeisen/blog-server))的技术选型，主要是由于自己本身是一个Java程序猿?‍?‍，所以在后端选型的时候直接决定了*Spring Boot*技术栈。\n' +
    '因为我开始做后端的时候，*Spring Boot 2*刚发布没有多久，抱着勇于尝试新技术的想法果断选择了2.0版本。后端数据库很自然的采用*MySQL*。最后剩下了数据缓存，我在选择了*Redis*， 除了*Redis*十分好用的原因外，主要也是我之前并没有用过，所以这次想要在自己的项目中做实践。当然，在我实际的使用过程中，我也发现了*Redis*是真的好用?。（这里就不描述细节方面，后面我会将本次搭建网站用到的技术和遇到的问题，在发布文章里面讲解）\n' +
    '\n' +
    '> 最开始也是用express作为网站后台，数据库采用Mongoose， 之前的Server连接[Express Server](https://github.com/mrmeisen/blog-server-express)\n' +
    '\n' +
    '&emsp; 服务器我采用目前流行的HTTP服务器*Nginx*。只想说，真的很好用!\n' +
    '\n' +
    '&emsp; Markdown渲染组件在React社区中有很多，而我为什么选择了一个并不React的Marked呢？额，因为好用? 在实际使用过程中，我通过自定义，可以很好的支持markdown语法，还可以结合*Highlight.js*对代码进行高亮渲染。最后，你看看这篇博客就知道好不好用了。\n' +
    '\n' +
    '&emsp; 在富文本编辑器的选择中，我经历过很多组件从最原生的*<textarea\\>*，到*react-lz-editor*，再到现在的*Simplemde-markdown-editor*，实践证明最好的永远在最后。\n' +
    '\n' +
    '&emsp; 最后安利一个React过渡组件*react-transition-group*，这个组件式React官方推荐，和React结合很好。\n' +
    '\n' +
    '\n' +
    '## 主页\n' +
    '\n' +
    '&emsp; 先来张预览图\n' +
    '\n' +
    '![图1 主页](/api/image/3866cc18f0c79878ac3b07a03e7c603d.png)\n' +
    '\n' +
    '\n' +
    '&emsp; 如我们图见到的那样， 主页整个页面包含了*网站header*，*文章card*，*热门文章*、*文章标签*、*网站footer*。\n' +
    '\n' +
    '### Header\n' +
    ' \n' +
    ' + Mei Sen : 网站Logo\n' +
    ' + Home: 主页入口\n' +
    ' + About： 关于我\n' +
    ' + 其他： 我的联系方式\n' +
    '\n' +
    '### Card\n' +
    '\n' +
    '&emsp; 每篇文章是按照Card的方式展示在主页上，用于用户对文章进行预览。\n' +
    '&emsp; Card包含了文章的题目、简介以及文章标签还有发布日期。\n' +
    '&emsp; 可以通过点击文章Card进入文章内容页面，这里我们后面会讲到。\n' +
    '\n' +
    '### 热门文章\n' +
    '\n' +
    '&emsp;  热门文章展示了访问量的最高的4篇博客，上图内容不够，所以没有展示全\n' +
    '\n' +
    '### 文章标签\n' +
    '\n' +
    '&emsp; 文章标签的内容为所有博客的标签，网站通过标签的形式展示。这里的文章标签是可以点击的，点击标签可以查询所有拥有该标签的文章。\n' +
    '\n' +
    '### Footer\n' +
    '\n' +
    '&emsp; 版权和说明信息\n' +
    '\n' +
    '\n' +
    '## 文章内容页\n' +
    '\n' +
    '&emsp;  惯例先来图片\n' +
    '\n' +
    '\n' +
    '\n' +
    '&emsp;  文章内容页面是博客网站的核心，她展示了一篇的所有内容。同时，可以从图中看到，该页面包含了文章的标题和发布具体时间，还有文章的引言。\n' +
    '\n' +
    '&emsp; 文章页面side bar展示的是与该文章相关联的热门文章\n' +
    '\n' +
    '&emsp; 文章内容使用*markdown* ，前端渲染使用组件为[Marked](https://github.com/markedjs/marke)，文本高亮样式采用了组件 [Highlight.js](https://github.com/isagalaev/highlight.js)。这两个在前面的技术栈也有讲到。\n' +
    '\n' +
    '> 使用了这两个组件也还需要自定义样式，不然样式会不好看的\n' +
    '\n' +
    '&emsp;  之前我使用了的是[React-Markdown](https://github.com/rexxars/react-markdown)，这个组件和React结合使用是十分顺手的。(为什么我会使用marked，说起来都是泪)\n' +
    '\n' +
    '\n' +
    '## 关于我\n' +
    '\n' +
    '&emsp;  关于我页面是一些对于自己的介绍，大家可以去看看\n' +
    '\n' +
    "&emsp; <a href='meisen.pro/about' class='link'>关于我</a>\n" +
    '\n' +
    '\n' +
    '\n' +
    '## 结语\n' +
    '&emsp; 差不多就到了这里了，这是本网站的第一篇文章，心里面非常想要写好，奈何本身语言水平有限?。以后我会坚持更新博客，也会继续优化网站，目前网站的功能真的非常简单，简单到连基本的评论功能都没有?，后面的这些功能我还会继续更新。\n' +
    '\n' +
    '\n' +
    '\n' +
    '\n' +
    '\n' +
    '\n' +
    '\n' +
    '\n' +
    '\n' +
    '\n' +
    '\n' +
    '\n' +
    '\n' +
    '\n' +
    '\n',
  visit: 10,
  compliment: 12,
  date: new Date(1527603200000),
  update: new Date(1527600200000),
};

export default {
  getNotice,
  getActivities,
  getPopularArticles,
  getAllArticles,
  getArticle,
  getFakeList,
};
