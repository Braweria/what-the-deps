import { Dependencies } from "@/app/components/Dependencies";

async function getPackageData(name: string) {
  const response = await fetch(`https://registry.npmjs.org/${name}/latest`);
  const { dependencies, devDependencies, peerDependencies } =
    await response.json();
  return { dependencies, devDependencies, peerDependencies };
}

export default async function Page({ params }: { params: { name: string } }) {
  const { name } = params;
  const decodedName = decodeURIComponent(name);
  const { dependencies, devDependencies, peerDependencies } =
    await getPackageData(decodedName);

  console.log(dependencies, devDependencies, peerDependencies);

  return (
    <div>
      <h1>Package {decodedName}</h1>
      <div style={{ display: "flex", gap: "6rem", marginTop: "2rem" }}>
        <Dependencies dependencies={dependencies} type="dependencies" />
        <Dependencies dependencies={devDependencies} type="devDependencies" />
        <Dependencies dependencies={peerDependencies} type="peerDependencies" />
      </div>
    </div>
  );
}
