import dynamic from 'next/dynamic';
const DefaultTemplate = dynamic(() => import("./defaultTemplate"))

const templates: any = {
  default: DefaultTemplate,
}

export default templates;



// task add selectTemplate to redux so when clicked on a template the template design can be displayed