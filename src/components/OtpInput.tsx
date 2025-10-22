import React, { useEffect, useMemo, useRef } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

type OtpInputProps = {
  length?: number;
  value: string;
  onChangeValue: (next: string) => void;
  onComplete?: (code: string) => void;
};

export default function OtpInput({
  length = 4,
  value,
  onChangeValue,
  onComplete,
}: OtpInputProps) {
  const inputsRef = useRef<Array<TextInput | null>>([]);

  const cells = useMemo(() => Array.from({ length }, (_, i) => i), [length]);

  useEffect(() => {
    if (value.length === length && onComplete) {
      onComplete(value);
    }
  }, [length, onComplete, value]);

  function focusAt(index: number) {
    const ref = inputsRef.current[index];
    ref?.focus();
  }

  function handleChange(text: string, index: number) {
    const sanitized = text.replace(/\D/g, '');
    if (sanitized.length === 0) {
      // no-op on empty insert; keep current value
      return;
    }

    // If multiple digits pasted, distribute across remaining cells
    const nextChars = sanitized.split('');
    const current = value.split('');
    for (
      let offset = 0;
      offset < nextChars.length && index + offset < length;
      offset++
    ) {
      current[index + offset] = nextChars[offset];
    }
    const next = current.join('').slice(0, length).padEnd(length, '');
    onChangeValue(next.replace(/\s/g, ''));

    const nextIndex = Math.min(index + nextChars.length, length - 1);
    if (nextIndex < length) {
      focusAt(nextIndex);
    }
  }

  function handleKeyPress(key: string, index: number) {
    if (key === 'Backspace') {
      const current = value.split('');
      if (current[index]) {
        current[index] = '';
        onChangeValue(current.join(''));
        return;
      }
      const prevIndex = Math.max(0, index - 1);
      current[prevIndex] = '';
      onChangeValue(current.join(''));
      focusAt(prevIndex);
    }
  }

  return (
    <View style={styles.row}>
      {cells.map(i => (
        <TextInput
          key={i}
          ref={r => (inputsRef.current[i] = r)}
          value={value[i] ?? ''}
          onChangeText={t => handleChange(t, i)}
          onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, i)}
          keyboardType="number-pad"
          returnKeyType="done"
          maxLength={1}
          style={styles.cell}
          textAlign="center"
          autoCapitalize="none"
          autoCorrect={false}
          importantForAutofill="yes"
          textContentType="oneTimeCode"
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    alignSelf: 'center',
  },
  cell: {
    height: 50,
    width: 50,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    fontSize: 20,
  },
});
