import TermLookupPopover from './term-lookup-popover';

type InteractiveTextProps = {
  text: string;
  context: string;
};

// A list of common English words to exclude from being interactive.
const commonWords = new Set([
  'a', 'an', 'the', 'and', 'but', 'or', 'for', 'nor', 'on', 'at', 'to', 'from', 'by', 'with', 'about',
  'in', 'out', 'of', 'is', 'are', 'was', 'were', 'be', 'being', 'been', 'have', 'has', 'had', 'do',
  'does', 'did', 'will', 'would', 'shall', 'should', 'can', 'could', 'may', 'might', 'must', 'you',
  'your', 'he', 'his', 'she', 'her', 'it', 'its', 'we', 'our', 'they', 'their', 'this', 'that', 'these',
  'those', 'here', 'there', 'when', 'where', 'why', 'how', 'what', 'which', 'who', 'whom', 'whose',
  'if', 'then', 'else', 'while', 'as', 'so', 'not', 'no', 'very', 'just', 'also'
]);

const isTerm = (word: string): boolean => {
  const cleanedWord = word.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "").toLowerCase();
  if (cleanedWord.length < 4) return false;
  if (commonWords.has(cleanedWord)) return false;
  // A simple heuristic: is the word capitalized (and not at the start of a sentence), or does it look like an acronym?
  // This is imperfect. A more robust solution might involve another LLM call or part-of-speech tagging.
  return word.charAt(0) === word.charAt(0).toUpperCase() || /^[A-Z]+s?$/.test(word);
};

const InteractiveText = ({ text, context }: InteractiveTextProps) => {
  if (typeof text !== 'string') {
    return null; // or <p></p>
  }
  // Split by spaces and newlines while keeping them
  const parts = text.split(/(\s+)/);

  return (
    <p className="whitespace-pre-wrap text-sm text-muted-foreground">
      {parts.map((part, index) => {
        const word = part.trim();
        if (word && isTerm(word)) {
          return (
            <TermLookupPopover key={index} term={word} context={context}>
              {part}
            </TermLookupPopover>
          );
        }
        return <span key={index}>{part}</span>;
      })}
    </p>
  );
};

export default InteractiveText;
