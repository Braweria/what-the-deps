type Props = {
  dependencies: Record<string, string>;
  type: "dependencies" | "devDependencies" | "peerDependencies";
};

function getDepName(type: Props["type"]) {
  switch (type) {
    case "dependencies":
      return "Dependencies";
    case "devDependencies":
      return "Dev Dependencies";
    case "peerDependencies":
      return "Peer Dependencies";
  }
}

function getRouteToPackage(name: string) {
  const encodedName = encodeURIComponent(name);
  return `/package/${encodedName}`;
}

export function Dependencies({ dependencies, type }: Props) {
  const deps = dependencies ? Object.entries(dependencies) : [];

  return (
    <section>
      <h2>
        {deps.length} {getDepName(type)}
      </h2>
      <ul
        style={{
          marginTop: "1rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
        }}
      >
        {deps.map(([name, version]) => (
          <li key={name}>
            <a href={getRouteToPackage(name)}>
              <>
                {name} {version}
              </>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
