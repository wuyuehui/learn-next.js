import Head from 'next/head'
import Date from '../../components/date'
import Layout from '../../components/layout'
import utilStyles from '../../styles/utils.module.css'
import { getAllPostIds, getPostData } from '../../lib/posts'
import { GetStaticProps, GetStaticPaths } from 'next'
export default function Post({ postData }) {
    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <article>
                <h1 className={utilStyles.headingXl}>{postData.title}</h1>
                <div className={utilStyles.lightText}>
                    <Date dateString={postData.date} />
                </div>
                <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
            </article>
        </Layout>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = getAllPostIds()
    return {
        paths,
        fallback: false
        // 任何未返回的路径getStaticPaths都将导致404 页面。
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    console.log(params);
    const postData = await getPostData(params.id)
    return {
        props: {
            postData
        }
    }
}