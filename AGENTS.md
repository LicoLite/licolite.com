# LicoMesh Website Agent Instructions

<!-- licomesh-dev:shared-rules:start -->
## Shared rules

- **parallel-work** — Delegate independent, bounded work to subagents when parallel execution materially improves speed or quality. Prefer fast models for simple text or code work and deep models for complex work; record any fallback when the requested class is unavailable.
- **privacy** — Never disclose machine identity, non-public personal data, secrets, ciphertext, protected backend data, raw runtime data, or sensitive command output. Deliberately published developer identity such as a project contact email or GitHub username may remain public; it never authorizes exposing a local account, host, path, device, credential, or unrelated metadata. Emit only redacted, minimum-necessary evidence.
- **public-release-boundary** — Keep development, ordinary verification, packaging, GitHub Release, and every platform store or channel as separate claims. Missing publisher accounts, store credentials, signing or notarization identities, listings, or channel access are non-blocking guidance outside an explicitly requested release to that specific store or channel. Public release metadata is limited to artifact name, version, platform, byte size, cryptographic digest, detached signature, verification algorithm or key identifier, only the public verification key or certificate-chain fields required to validate that signature, and cryptographically bound provenance or attestation when it is itself part of verification. Omit publisher, account, team, tenant, device, profile, credential, private-channel, and internal release metadata.
- **complete-migration** — Complete refactors and migrations in one pass. Remove superseded implementations, names, paths, compatibility layers, tests, and documentation unless the user explicitly requires coexistence.
- **retired-state-reset** — Persistent user state owned by a retired product name is reset, not migrated. The current product must initialize fresh current-name state and must never discover, import, rename, copy, translate, or prompt for a retired-name data root or preference namespace; do not preserve legacy-state fixtures or compatibility gates.
- **algorithm-quality** — For algorithmic or data-structure work, compare relevant primary or open-source implementations, choose appropriate structures and caching, avoid repeated computation, and optimize scheduling, memory, and concurrency.
- **retired-artifacts** — Removed code and documentation must not remain as permanent tests, fixtures, compatibility checks, or release gates.
<!-- licomesh-dev:shared-rules:end -->

<!-- licomesh-dev:repository-scope:start -->
## Repository scope

- Own the public website and its deployment assets.
- Keep product claims aligned with canonical core and client documentation.
- Reuse only the canonical consumer-verification metadata for public artifacts; do not copy publisher, account, signing, or private-channel configuration.
- Use synthetic public examples and never include backend runtime evidence.
<!-- licomesh-dev:repository-scope:end -->

## 品牌形象与组织基因

- LicoMesh 的四个核心词是：**多元、互联、开放、融合**。
- 本仓库是静态官网，主要通过 `index.html` 的页面描述、首屏、快速开始、集成区文案和维护注释体现这些词。
- 多元表现为智能体、客户端、外部服务和连接器；互联表现为受治理的工作区和可追溯流程；开放表现为开放服务连接器；融合表现为文件、知识、工具和操作汇入同一个可追溯体验。
- 修改官网时，把这些词转成具体产品文案和页面结构，不要新增公开纲领页。
