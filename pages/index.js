import Head from 'next/head'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter';

export default function Home({ posts}) {
  return (
    <div>
      <Head>
        <title>Dev Blog</title>
      </Head>
      <div className="posts">
        {posts.map((post, index) => (
          <h3 key={index}>{post.frontmatter.title}</h3>
        ) )}
      </div>
     
    </div>
  )
}


export async function getStaticProps(){
  // Get files
    const files = fs.readdirSync(path.join('posts'))
    
    // Create slug
    const posts = files.map(filename => {
      const slug = filename.replace('.md', '')

      // get frontmatter
      const markdownWithMeta = fs.readFileSync(path.join('posts', filename), 'utf-8')
      const {data: frontmatter} = matter(markdownWithMeta)
      

      return {
        slug,
        frontmatter
      }
    })


    return {
      props: {
        posts
      }
    }
}
