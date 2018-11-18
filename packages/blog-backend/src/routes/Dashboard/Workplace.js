import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Row, Col, Card, Avatar } from 'antd';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './Workplace.less';

@connect(({ article, loading }) => ({
  article,
  articleLoading: loading.effects['article/fetchPopular'],
}))
export default class Workplace extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'article/fetchPopular',
      payload: { page: 0, size: 9 },
    });
  }

  render() {
    const {
      article: { popular },
      articleLoading,
    } = this.props;

    const pageHeaderContent = (
      <div className={styles.pageHeaderContent}>
        <div className={styles.avatar}>
          <Avatar
            size="large"
            src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png"
          />
        </div>
        <div className={styles.content}>
          <div className={styles.contentTitle}>困而学, 学而知.</div>
          <div>Java软件工程师 前端开发工程师</div>
        </div>
      </div>
    );

    return (
      <PageHeaderLayout content={pageHeaderContent}>
        <Row gutter={24}>
          <Col xl={24} lg={24} md={24} sm={24} xs={24}>
            <Card
              className={styles.projectList}
              style={{ marginBottom: 24 }}
              title="热门文章"
              bordered={false}
              extra={<Link to="/article/blogList">全部文章</Link>}
              loading={articleLoading}
              bodyStyle={{ padding: 0 }}
            >
              {popular.map(item => (
                <Card.Grid className={styles.projectGrid} key={item.id}>
                  <Card bodyStyle={{ padding: 0 }} bordered={false}>
                    <Card.Meta
                      title={
                        <div className={styles.cardTitle}>
                          <Link to={{ pathname: '/article/blogDetail', search: `id=${item.id}` }}>
                            {item.title}
                          </Link>
                        </div>
                      }
                      description={item.summary}
                    />
                    <div className={styles.projectItemContent}>
                      {item.update && (
                        <span className={styles.datetime} title={item.update}>
                          {moment(item.update).fromNow()}
                        </span>
                      )}
                    </div>
                  </Card>
                </Card.Grid>
              ))}
            </Card>
          </Col>
        </Row>
      </PageHeaderLayout>
    );
  }
}
