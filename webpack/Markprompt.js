import React, { useContext } from 'react';
import * as Markprompt from '@markprompt/react';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

import css from './style.css';

const test = true

function Component({ dark = false}) {
  // Use from a whitelisted domain.
  return (
    <Markprompt.Root
      projectKey={test ? "sk_test_aCj1IcLQkl55GIkLencXkJWH5SOaoyaT" : "7GfAooKPITQZN05Sz8ZAV20OtADTW3uP"}
      iDontKnowMessage="Sorry, I am not sure how to answer that."
      placeholder="Ask me anything…"
      loadingHeading="Fetching relevant pages…"
      referencesHeading="Answer generated from the following pages:"
      model="gpt-4"
      promptTemplate={`You are a very enthusiastic company representative who loves to help people! Given the following sections from the documentation (preceded by a section id), answer the question using only that information, output in Markdown format. If you are unsure and the answer is not explicitly written in the documentation, say "{{I_DONT_KNOW}}".

Context sections:
---
{{CONTEXT}}

Question: "{{PROMPT}}"

Answer (including related code snippets if available):`}
      temperature={0.1}
      topP={1}
      frequencyPenalty={0}
      presencePenalty={0}
      maxTokens={500}
      sectionsMatchCount={10}
      sectionsMatchThreshold={0.5}
    >
      <Markprompt.Trigger
        aria-label="Open Markprompt"
        className="MarkpromptButton"
      >
        <ChatIcon className="MarkpromptIcon" />
      </Markprompt.Trigger>
      <Markprompt.Portal>
        <Markprompt.Overlay className="MarkpromptOverlay" />
        <Markprompt.Content className={`MarkpromptContent${dark ? ' dark' : ''}`}>
          <Markprompt.Close className="MarkpromptClose">
            <CloseIcon />
          </Markprompt.Close>

          {/* Markprompt.Title is required for accessibility reasons. It can be hidden using an accessible content hiding technique. */}
          <VisuallyHidden asChild>
            <Markprompt.Title>
              Ask me anything about Markprompt
            </Markprompt.Title>
          </VisuallyHidden>

          {/* Markprompt.Description is included for accessibility reasons. It is optional and can be hidden using an accessible content hiding technique. */}
          <VisuallyHidden asChild>
            <Markprompt.Description>
              I can answer your questions about Markprompt's client-side
              libraries, onboarding, API's and more.
            </Markprompt.Description>
          </VisuallyHidden>

          <Markprompt.Form>
            <SearchIcon className="MarkpromptSearchIcon" />
            <Markprompt.Prompt className="MarkpromptPrompt" />
          </Markprompt.Form>

          <Markprompt.AutoScroller className="MarkpromptAnswer">
            <Caret />
            <Markprompt.Answer />
          </Markprompt.AutoScroller>

          <References />
        </Markprompt.Content>
      </Markprompt.Portal>
    </Markprompt.Root>
  );
}

const Caret = () => {
  const { answer } = useContext(Markprompt.Context);

  if (answer) {
    return null;
  }

  return <span className="caret" />;
};

const capitalize = (text) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

const removeFileExtension = (fileName) => {
  const lastDotIndex = fileName.lastIndexOf('.');
  if (lastDotIndex === -1) {
    return fileName;
  }
  return fileName.substring(0, lastDotIndex);
};

const Reference = ({
  referenceId,
  index,
}) => {
  return (
    <li
      key={referenceId}
      className="reference"
      style={{
        animationDelay: `${100 * index}ms`,
      }}
    >
      <a href={removeFileExtension(referenceId)}>
        {capitalize(removeFileExtension(referenceId.split('/').slice(-1)[0]))}
      </a>
    </li>
  );
};

const References = () => {
  const { state, references } = useContext(Markprompt.Context);

  if (state === 'indeterminate') return null;

  let adjustedState = state;
  if (state === 'done' && references.length === 0) {
    adjustedState = 'indeterminate';
  }

  return (
    <div data-loading-state={adjustedState} className="references">
      <div className="progress" />
      <p>Fetching relevant pages…</p>
      <p>Answer generated from the following sources:</p>
      <Markprompt.References RootElement="ul" ReferenceElement={Reference} />
    </div>
  );
};

const SearchIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" x2="16.65" y1="21" y2="16.65"></line>
  </svg>
);

const CloseIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" x2="6" y1="6" y2="18"></line>
    <line x1="6" x2="18" y1="6" y2="18"></line>
  </svg>
);

const ChatIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"></path>
  </svg>
);

export default Component;