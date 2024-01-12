import "./MenuListTemplate.css";
interface MenuListTemplateProps {
  headding: string;
  children: React.ReactNode[];
}
const MenuListTemplate = ({ headding, children }: MenuListTemplateProps) => {
  return (
    <div className="menuListTemplateDiv">
      <h3 className="divTitle">{headding}</h3>
      <ul className="menuLists grid">{children}</ul>
    </div>
  );
};

export default MenuListTemplate;
