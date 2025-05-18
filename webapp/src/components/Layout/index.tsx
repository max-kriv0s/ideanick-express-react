import { Link, Outlet } from 'react-router-dom';
import { getAllIdeasRoute, getNewIdeaRouter } from '../../lib/routes';
import css from './index.module.scss';

export const Layout = () => {
  return (
    <div className={css.layout}>
      <div className={css.navigation}>
        <div className={css.logo}>IdeaNick</div>
        <ul className={css.menu}>
          <li className={css.item}>
            <Link className={css.link} to={getAllIdeasRoute()}>
              All ideas
            </Link>
          </li>
          <li className={css.item}>
            <Link className={css.link} to={getNewIdeaRouter()}>
              Add Idea
            </Link>
          </li>
        </ul>
      </div>
      <div className={css.content}>
        <Outlet />
      </div>
    </div>
  );
};
