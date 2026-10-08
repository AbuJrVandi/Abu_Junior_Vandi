#!/usr/bin/env node
'use strict';

const { spawn, spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const BUILD_DIR = path.join(ROOT, 'build');
const started = process.hrtime.bigint();

const useColor =
  !process.env.NO_COLOR &&
  (process.stdout.isTTY || process.env.NETLIFY === 'true' || process.env.CI === 'true');

const ANSI = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
};

const paint = (color, text) => (useColor ? `${color}${text}${ANSI.reset}` : text);
const WIDTH = 72;

const stamp = () => {
  const d = new Date();
  const p = (n) => String(n).padStart(2, '0');
  return `${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`;
};

const elapsed = () => {
  const secs = Number(process.hrtime.bigint() - started) / 1e9;
  return secs < 60
    ? `${secs.toFixed(1)}s`
    : `${Math.floor(secs / 60)}m ${String(Math.round(secs % 60)).padStart(2, '0')}s`;
};

const rule = (char = '\u2500') => console.log(paint(ANSI.dim, char.repeat(WIDTH)));

const heading = (title) => {
  console.log('');
  console.log(
    `${paint(ANSI.cyan, `[${stamp()}]`)} ${paint(ANSI.bold, `\u25B8 ${title}`)}`
  );
};

const kv = (key, value) => {
  console.log(`  ${paint(ANSI.dim, `${key}`.padEnd(13))} ${value}`);
};

const note = (text) => {
  if (text) console.log(`  ${paint(ANSI.dim, text)}`);
};

const git = (args) => {
  try {
    const res = spawnSync('git', args, { cwd: ROOT, encoding: 'utf8' });
    return res.status === 0 ? res.stdout.trim() : null;
  } catch {
    return null;
  }
};

const runLive = (cmd, args, env = {}) =>
  new Promise((resolve) => {
    const childEnv = { ...process.env, ...env };
    const options = { cwd: ROOT, stdio: 'inherit', env: childEnv };
    // Windows needs a shell to resolve .cmd shims, but Node warns when an
    // args array is combined with shell:true — pass a single string instead.
    const child =
      process.platform === 'win32'
        ? spawn(`${cmd} ${args.join(' ')}`, { ...options, shell: true })
        : spawn(cmd, args, options);
    child.on('close', (code) => resolve(code ?? 1));
    child.on('error', () => resolve(1));
  });

const formatBytes = (bytes) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} kB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
};

const collectFiles = (dir) => {
  const out = [];
  const walk = (current) => {
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) walk(full);
      else out.push({ file: full, size: fs.statSync(full).size });
    }
  };
  walk(dir);
  return out;
};

const shortRef = (ref) => (ref && ref.length > 7 ? ref.slice(0, 7) : ref);

async function main() {
  console.log('');
  rule('\u2550');
  console.log(paint(ANSI.bold, '  PORTFOLIO 2026  \u00B7  DEPLOYMENT BUILD'));
  console.log(paint(ANSI.dim, '  Abu Junior Vandi \u2014 personal portfolio'));
  rule('\u2550');

  heading('Environment');
  kv('Node', process.version);
  const npmVersion = spawnSync('npm --version', { encoding: 'utf8', shell: true });
  kv('npm', npmVersion.status === 0 ? npmVersion.stdout.trim() : 'unknown');
  kv('Platform', `${process.platform} (${process.arch})`);
  kv(
    'Context',
    process.env.NETLIFY === 'true'
      ? `Netlify \u00B7 ${process.env.CONTEXT || 'production'}`
      : 'Local'
  );
  kv('Branch', process.env.BRANCH || git(['rev-parse', '--abbrev-ref', 'HEAD']) || '\u2014');
  kv(
    'Commit',
    shortRef(process.env.COMMIT_REF || git(['rev-parse', '--short', 'HEAD'])) || '\u2014'
  );
  const deployUrl = process.env.DEPLOY_PRIME_URL || process.env.URL;
  if (deployUrl) kv('Deploy URL', deployUrl);

  heading('Dependencies');
  if (fs.existsSync(path.join(ROOT, 'node_modules'))) {
    kv('Status', 'node_modules present \u2014 skipping install');
    note(process.env.NETLIFY === 'true' ? '(installed by Netlify before this step)' : '');
  } else {
    kv('Status', 'node_modules missing \u2014 running npm install');
    const installCode = await runLive('npm', ['install']);
    if (installCode !== 0) return finish(false, installCode);
  }

  heading('Build');
  kv('Command', 'npm run build');
  kv('CI mode', 'false (compiler warnings will not fail the build)');
  console.log('');
  const buildCode = await runLive('npm', ['run', 'build'], { CI: 'false' });
  if (buildCode !== 0) return finish(false, buildCode);

  heading('Artifacts');
  if (!fs.existsSync(BUILD_DIR)) {
    kv('Status', paint(ANSI.red, 'build/ directory not found'));
    return finish(false, 1);
  }
  const files = collectFiles(BUILD_DIR);
  const total = files.reduce((sum, f) => sum + f.size, 0);
  const top = files.sort((a, b) => b.size - a.size).slice(0, 5);
  for (const f of top) {
    kv(path.relative(BUILD_DIR, f.file), formatBytes(f.size));
  }
  note(`\u2026 and ${Math.max(files.length - top.length, 0)} more files`);
  kv('Total', `${files.length} files \u00B7 ${formatBytes(total)}`);
  kv('Publish dir', 'build/');

  return finish(true, 0);
}

function finish(ok, code) {
  console.log('');
  rule('\u2550');
  if (ok) {
    console.log(
      `  ${paint(ANSI.green, '\u2713')} ${paint(ANSI.bold, 'Build completed')} in ${paint(
        ANSI.bold,
        elapsed()
      )}`
    );
  } else {
    console.log(
      `  ${paint(ANSI.red, '\u2717')} ${paint(ANSI.bold, 'Build failed')} after ${paint(
        ANSI.bold,
        elapsed()
      )} \u2014 see errors above`
    );
  }
  rule('\u2550');
  console.log('');
  process.exit(code);
}

main().catch((error) => {
  console.error(paint(ANSI.red, `Deploy log script crashed: ${error.message}`));
  process.exit(1);
});
