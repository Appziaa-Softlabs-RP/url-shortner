import DocsBreadcrumb from "@/components/breadcrumb";
import Pagination from "@/components/pagination";
import Toc from "@/components/toc";
import { Typography } from "@/components/typography";
import { getDataForSlug } from "@/lib/markdown";
import { api_page_routes } from "@/lib/routes-config";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ slug: string[] }>;
};

export default async function DocsPage(props: PageProps) {
  const params = await props.params;

  const {
    slug = []
  } = params;

  const pathName = slug.join("/");
  const res = await getDataForSlug(pathName, 'api');

  if (!res) notFound();
  return (
    <div className="flex items-start gap-10">
      <div className="flex-[4.5] pt-10">
        <DocsBreadcrumb paths={slug} name="API" />
        <Typography>
          <h1 className="text-3xl !-mt-0.5">{res.frontmatter.title}</h1>
          <p className="-mt-4 text-muted-foreground text-[16.5px]">
            {res.frontmatter.description}
          </p>
          <div>{res.content}</div>
          <Pagination pathname={pathName} type="api" />
        </Typography>
      </div>
      <Toc path={pathName} type={'api'} />
    </div>
  );
}

export async function generateMetadata(props: PageProps) {
  const params = await props.params;

  const {
    slug = []
  } = params;

  const pathName = slug.join("/");
  const res = await getDataForSlug(pathName, 'api');
  if (!res) return null;
  const { frontmatter } = res;
  return {
    title: frontmatter.title,
    description: frontmatter.description,
  };
}

export function generateStaticParams() {
  return api_page_routes.map((item) => ({
    slug: item.href.split("/").slice(1),
  }));
}
