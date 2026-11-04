import { describe, expect, it } from 'vitest';
import { checkMetaDescription, checkProse, checkTitle, cleanText } from '../src/lib/content-checks';

const rules = (text: string, severity = 'error') =>
  checkProse(text)
    .filter((i) => i.severity === severity)
    .map((i) => i.rule);

const clean =
  'Small finance teams that close the books every month usually start with bank feeds, because matching transactions by hand takes most of the first week.';

describe('checkProse', () => {
  it('passes plain copy that follows the rules', () => {
    expect(rules(clean)).toEqual([]);
  });

  it('flags banned words and phrases', () => {
    expect(rules('Teams can leverage the import tool to move ledgers from an older system in one afternoon.')).toContain('banned-word');
    expect(rules('When it comes to payroll, most owners in the survey wanted direct deposit on the first day.')).toContain('banned-phrase');
  });

  it('allows a banned word used as a plan name in mid-sentence', () => {
    expect(rules('Timesheet approvals on TimeCamp start on the Ultimate plan at $9.99 per user a month.')).toEqual([]);
    expect(rules('This is the ultimate tool for teams that bill clients by the hour every single week.')).toContain('banned-word');
    expect(rules('Ultimate costs $9.99 per user a month when the team pays for a full year upfront.')).toContain('banned-word');
  });

  it('flags dashes, bold text and "It\'s not X, it\'s Y"', () => {
    expect(rules('Prices start at $19 a month — billed monthly for every company on the plan.')).toContain('dashes');
    expect(rules('The **Plus** plan adds approvals for bills over a set amount chosen by the admin.')).toContain('bold');
    expect(rules("It's not a payroll tool, it's an accounting system with a payroll add-on for small teams.")).toContain('not-x-its-y');
  });

  it('flags sentences that start with And, But, Also or So', () => {
    expect(rules(`${clean} But the import tool only reads files exported in the last twelve months by the old system.`)).toContain(
      'starts-with-conjunction',
    );
  });

  it('flags text that must never be published', () => {
    expect(rules('The free trial length could not be found on the vendor site during the research step.')).toContain('never-publish');
    expect(rules('TODO add the pricing for the Plus plan once the vendor confirms the new annual rate.')).toContain('never-publish');
  });

  it('flags a closing paragraph that sums up', () => {
    expect(rules(`${clean}\n\nOverall, accounting software saves small teams time and gives owners a clearer picture.`)).toContain(
      'closing-summary',
    );
  });

  it('warns about questions and very short paragraphs', () => {
    expect(rules('Which plan includes approvals for larger bills paid from the main operating account?', 'warning')).toContain('question');
    expect(rules('It works.', 'warning')).toContain('one-line-punchline');
  });
});

describe('titles and descriptions', () => {
  it('limits titles to 60 characters and descriptions to 155', () => {
    expect(checkTitle('x'.repeat(60))).toEqual([]);
    expect(checkTitle('x'.repeat(61))).toHaveLength(1);
    expect(checkMetaDescription('x'.repeat(155))).toEqual([]);
    expect(checkMetaDescription('x'.repeat(156))).toHaveLength(1);
  });
});

describe('cleanText', () => {
  it('fixes quotes, percentages and dashes', () => {
    expect(cleanText('“Plans” rose 13 percent — from 10–12 seats')).toBe('"Plans" rose 13%, from 10 to 12 seats');
  });
});
