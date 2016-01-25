import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom/server';
import serialize from 'serialize-javascript';
import Helmet from 'react-helmet';
import configHead from 'constants/head';

/**
 * Wrapper component containing HTML metadata and boilerplate tags.
 * Used in server-side code only to wrap the string output of the
 * rendered route component.
 *
 * The only thing this component doesn't (and can't) include is the
 * HTML doctype declaration, which is added to the rendered output
 * by the server.js file.
 */
export default class Html extends Component {
  static propTypes = {
    assets: PropTypes.object,
    component: PropTypes.node,
    store: PropTypes.object
  }

  render() {
    const { assets, component, store } = this.props;
    const content = component ? ReactDOM.renderToString(component) : '';
    const head = component ? Helmet.rewind() : configHead;
    const helmetComponent = component ? (
      //{head.base.toComponent()}
      <div>
        {head.title.toComponent()}
        {head.meta.toComponent()}
        {head.link.toComponent()}
      </div>
    ) : (
      //base={head.base}
      <Helmet
        title={head.title}
        titleTemplate={head.titleTemplate}
        meta={head.meta}
        link={head.link}
      />
    );

    return (
      <html lang="en-us">
        <head>
          {helmetComponent}

          <link rel="shortcut icon" href="/favicon.ico" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {/* styles (will be present only in production with webpack extract text plugin) */}
          {Object.keys(assets.styles).map((style, key) =>
              <link href={assets.styles[style]} key={key} media="screen, projection"
                rel="stylesheet" type="text/css" charSet="UTF-8"
              />
          )}

        </head>
        <body>
        <div id="content" dangerouslySetInnerHTML={{ __html: content }}/>
        <script dangerouslySetInnerHTML={{ __html: `window.__data=${serialize(store.getState())};` }} charSet="UTF-8"/>
        <script src={assets.javascript.main} charSet="UTF-8"/>
        </body>
      </html>
    );
  }
}
