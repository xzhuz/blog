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

export default {
  getNotice,
  getActivities,
  getPopularArticles,
  getAllArticles,
  getFakeList,
};
