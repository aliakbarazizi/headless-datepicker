const printWidth = 80;

export function addProvider(code: string) {
  return `const [value, setValue] = useState<Date | null>(new Date());
<Datepicker value={value} onChange={setValue}>
  ${code.replace(/\n^/gm, '\n  ')}
</Datepicker>`;
}

export function storyToJsx(
  story: any,
  override: any,
  displayName: string,
  intent: number,
) {
  const args: string[] = [];

  const props = {
    ...story.args,
    ...story.parameters.override,
    ...override,
  };

  const space = ' '.repeat(intent * 2);

  let children = props.children;

  Object.entries(props as { [key: string]: any }).forEach(([key, value]) => {
    let v =
      (story.parameters.override && key in story.parameters.override) ||
      key in override ||
      key === 'children'
        ? value
        : typeof value === 'boolean' || typeof value === 'number'
        ? `{${value}}`
        : `"${value}"`;

    if (typeof v === 'string') {
      v = v.replace(/\n^/gm, '\n' + space);
    }

    if (key === 'children') {
      children = v;
      return;
    }

    if (v === false) {
      return;
    }

    args.push(v === '{true}' ? `${key}` : `${key}=${v}`);
  });

  const isRoot = displayName === 'Datepicker';

  const lineWidth =
    space.length +
    args.reduce((sum, a) => sum + a.length, 0) +
    (args.length - (isRoot ? 1 : 0)) * 2 +
    `<Datepicker.${displayName}>`.length;

  const shouldAddBreakLine =
    lineWidth >= printWidth &&
    (args.length > 1 || !args[0].match(/^\w+="[^"]*"$/));

  const argDelimiter = shouldAddBreakLine ? '\n  ' + space : ' ';

  let arg = argDelimiter + args.join(argDelimiter);

  if (typeof children === 'string') {
    arg += shouldAddBreakLine ? '\n' + space : '';
    return replaceChildren(
      `<${displayName}${arg}/>`,
      children,
      displayName,
      intent,
    );
  } else {
    arg += shouldAddBreakLine ? '\n' + space : ' ';
    return `<Datepicker.${displayName}${arg}/>`;
  }
}

export function replaceChildren(
  code: string,
  children: string,
  displayName: string,
  intent = 0,
) {
  const space = ' '.repeat(intent * 2);

  const prefix = displayName === 'Datepicker' ? '' : 'Datepicker.';

  return children
    ? code
        // .replace(`<${displayName}`, `<Datepicker.${displayName}`)
        // .replace(
        //   '/>',
        //   '>\n  ' + space + children + `\n${space}</Datepicker.${displayName}>`,
        // )
        .replace(
          new RegExp(`<${displayName}((?:=>|<[^>]*>|[^>])*?)/?>(.|\n)*$`, 'g'),
          `<${prefix}${displayName}$1>\n  ${space}${children}\n${space}</${prefix}${displayName}>`,
        )
    : code;
}
