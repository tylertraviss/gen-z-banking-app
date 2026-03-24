/**
 * Logger Service
 *
 * Provides structured, leveled logging for the application.
 * - Development: colorized console output with timestamp, level, tag, and message.
 * - Production: DEBUG and INFO are suppressed; WARN and ERROR are always emitted.
 *
 * Usage:
 *   import { logger } from './logger';
 *   logger.info('Auth', 'User signed in', { userId });
 *   logger.error('API', 'Request failed', error);
 */

// ─── Types ────────────────────────────────────────────────────────────────────

export type LogLevel = 'DEBUG' | 'INFO' | 'WARN' | 'ERROR';

export interface LogEntry {
  level: LogLevel;
  tag: string;
  message: string;
  data?: unknown;
  timestamp: string;
}

// ─── Config ───────────────────────────────────────────────────────────────────

const IS_DEV = __DEV__;

// ANSI color codes (work in Metro / Node terminals; ignored on device).
const COLORS: Record<LogLevel, string> = {
  DEBUG: '\x1b[36m',   // cyan
  INFO:  '\x1b[32m',   // green
  WARN:  '\x1b[33m',   // yellow
  ERROR: '\x1b[31m',   // red
};
const RESET = '\x1b[0m';

// ─── Remote Error Reporting ───────────────────────────────────────────────────

/**
 * TODO: integrate a remote error-reporting SDK (e.g. Sentry).
 *
 * Example with Sentry:
 *   import * as Sentry from '@sentry/react-native';
 *   Sentry.captureException(error);
 *   Sentry.captureMessage(message, 'warning');
 *
 * Call `reportToRemote` from the WARN/ERROR branches below once the SDK
 * is initialised in your app entry point.
 */
function reportToRemote(_entry: LogEntry): void {
  // TODO: forward WARN/ERROR entries to remote error reporting (e.g. Sentry).
}

// ─── Core ─────────────────────────────────────────────────────────────────────

function formatTimestamp(): string {
  return new Date().toISOString();
}

function emit(level: LogLevel, tag: string, message: string, data?: unknown): void {
  // In production suppress DEBUG and INFO entirely.
  if (!IS_DEV && (level === 'DEBUG' || level === 'INFO')) {
    return;
  }

  const timestamp = formatTimestamp();
  const entry: LogEntry = { level, tag, message, data, timestamp };

  if (IS_DEV) {
    const color = COLORS[level];
    const prefix = `${color}[${timestamp}] [${level}] [${tag}]${RESET}`;
    if (data !== undefined) {
      // eslint-disable-next-line no-console
      console.log(prefix, message, data);
    } else {
      // eslint-disable-next-line no-console
      console.log(prefix, message);
    }
  } else {
    // Production: plain output for WARN/ERROR only.
    const plainPrefix = `[${timestamp}] [${level}] [${tag}]`;
    if (data !== undefined) {
      // eslint-disable-next-line no-console
      console.warn(plainPrefix, message, data);
    } else {
      // eslint-disable-next-line no-console
      console.warn(plainPrefix, message);
    }
    reportToRemote(entry);
  }
}

// ─── Public API ───────────────────────────────────────────────────────────────

export const logger = {
  /**
   * Verbose diagnostic information. Suppressed in production.
   */
  debug(tag: string, message: string, data?: unknown): void {
    emit('DEBUG', tag, message, data);
  },

  /**
   * General informational messages. Suppressed in production.
   */
  info(tag: string, message: string, data?: unknown): void {
    emit('INFO', tag, message, data);
  },

  /**
   * Something unexpected that doesn't halt execution.
   * Emitted in production and forwarded to remote reporting.
   */
  warn(tag: string, message: string, data?: unknown): void {
    emit('WARN', tag, message, data);
  },

  /**
   * An error occurred. Always emitted and forwarded to remote reporting.
   * Pass the caught error object as the third argument when available.
   */
  error(tag: string, message: string, error?: unknown): void {
    emit('ERROR', tag, message, error);
  },
};
