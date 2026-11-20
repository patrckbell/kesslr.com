import React from "react";
import { roles, socialProfiles } from "./content.js";
import { useHeroReveal } from "./hero-reveal.js";
import { animateRoleMarker } from "./role-marker.js";

const assetPath = `${import.meta.env.BASE_URL}assets/`;

function SocialProfiles() {
  return (
    <div className="social-profiles">
      {socialProfiles.map(({ name, icon, url }) => {
        const src = `${assetPath}icons/${icon}`;
        return url ? (
          <a key={name} href={url} aria-label={`Kronus on ${name}`}>
            <img src={src} alt="" />
          </a>
        ) : (
          <img key={name} className="social-icon" src={src} alt="" />
        );
      })}
    </div>
  );
}

export function App() {
  const hero = useHeroReveal();

  return (
    <>
      <header id="top" className="site-header">
        <a href="#top" aria-label="Kronus home">
          <img src={`${assetPath}kronus-icon.svg`} width="35" height="24" alt="" />
        </a>
      </header>

      <main>
        <section className="hero" aria-labelledby="brand">
          <div className="frame hero-frame">
            <div className="hero-brand" ref={hero}>
              <h1 id="brand" className="hero-wordmark">
                <img src={`${assetPath}kronus-wordmark.png`} width="1668" height="222" alt="Kronus" />
                <canvas aria-hidden="true" className="hero-reveal" />
              </h1>
              <div className="hero-caption">
                <p>Full website coming <span className="hero-ending">soon<span className="hero-ellipsis">...</span></span></p>
                <canvas aria-hidden="true" className="hero-reveal" />
              </div>
            </div>
            <div className="roles-jump">
              <span className="roles-label">View open roles</span>
              <span className="roles-chevron" aria-hidden="true"><span className="chevron" /></span>
            </div>
          </div>
        </section>

        <section id="careers" className="careers" aria-labelledby="careers-title">
          <div className="frame careers-frame">
            <h2 id="careers-title">Join Kronus</h2>
            <p className="careers-intro">
              We're building the tools that will define how the world's most critical software is
              developed, verified, and deployed. It's an ambitious engineering challenge, and we're
              assembling a team of people who care deeply about solving hard problems, taking
              ownership, and building things that matter.
            </p>
            <div className="roles-list">
              <table className="roles-table" aria-label="Open roles" role="table">
                <thead role="rowgroup">
                  <tr role="row">
                    <th scope="col" role="columnheader">Title</th>
                    <th scope="col" role="columnheader">Location</th>
                  </tr>
                </thead>
                <tbody role="rowgroup">
                  {roles.map(({ id, title, location, ashbyUrl }) => (
                    <tr key={id} role="row" onPointerEnter={animateRoleMarker} onPointerLeave={animateRoleMarker}>
                      <th scope="row" role="rowheader">
                        <span className="role-marker" aria-hidden="true" />
                        {ashbyUrl ? (
                          <a href={ashbyUrl} className="role-link">{title}</a>
                        ) : title}
                      </th>
                      <td role="cell">{location}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="frame footer-frame">
          <a className="footer-brand" href="#top" aria-label="Kronus home">
            <img src={`${assetPath}kronus-wordmark.png`} width="1668" height="222" alt="" />
          </a>
          <SocialProfiles />
          <p className="copyright">© 2026 Kronus Corp. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
