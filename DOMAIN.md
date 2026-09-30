# gabrielpascualy.com

The domain was registered through Route 53 on September 30, 2026 and expires on September 30, 2027. Annual renewal and privacy for all registration contacts are enabled; contact email verification is complete. The verified registration and renewal price at setup was $16/year. Route 53 DNS adds $0.50/month for one hosted zone, plus query charges and applicable taxes.

The site is connected to GitHub Pages at [https://gabrielpascualy.com/](https://gabrielpascualy.com/). The root and `www` DNS records pass GitHub's checks, its certificate covers both names, and HTTPS enforcement is enabled.

## Connection reference

1. Register the exact domain for one year with contact privacy enabled. Confirm the registrant email if AWS requests it.
2. Use the hosted zone Route 53 creates during registration; do not create a duplicate zone.
3. Set the custom domain in this repository's GitHub Pages settings to `gabrielpascualy.com`.
4. Add the records below in the domain's hosted zone. Preserve its NS and SOA records and any other existing records.
5. Rebuild the website. The publishing workflow reads the new address from GitHub and automatically updates links, canonical URLs, RSS, and sitemap.
6. Enable GitHub Pages' Enforce HTTPS setting once its certificate is issued. Verify both the root domain and `www`.

| Name | Type | Value | TTL |
| --- | --- | --- | --- |
| `gabrielpascualy.com` | A | `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` | 300 |
| `gabrielpascualy.com` | AAAA | `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153` | 300 |
| `www.gabrielpascualy.com` | CNAME | `pascualy.github.io` | 300 |

These addresses come from [GitHub's custom-domain documentation](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site). Registration steps and the automatically created hosted zone are described in [AWS's domain-registration documentation](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/domain-register.html).

Future website changes publish automatically from `main`. GitHub Pages manages the HTTPS certificate; Route 53 manages registration and DNS. Keep the domain's name servers synchronized with its existing hosted zone if you change the DNS setup.
