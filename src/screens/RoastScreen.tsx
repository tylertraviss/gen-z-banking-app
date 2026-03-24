import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../theme/colors';


type Message = {
  id: string;
  role: 'user' | 'ai';
  text: string;
};

const initialMessages: Message[] = [
  {
    id: '1',
    role: 'user',
    text: 'How am I doing this month? Be real with me.',
  },
  {
    id: '2',
    role: 'ai',
    text: "Oh, you want \"real\"? Okay, bestie. Let's look at the receipts. 💅\n\nYou spent $64.20 on DoorDash last night while your fridge is literally full of groceries. I can see the Trader Joe's transaction from Tuesday. Do better.\n\nAlso, that \"one coffee\" habit? You're at $112 for the month at Starbucks. You're not a main character, you're a loyalty program statistic. Redirect that energy into your savings vault, please. ☕️💀",
  },
  {
    id: '3',
    role: 'user',
    text: "Where's my money even going?",
  },
  {
    id: '4',
    role: 'ai',
    text: "It's going to \"Vibes & Subscriptions\" apparently. You have 4 different streaming services and you've only used one in the last 30 days. That's $45/month just to keep the CEOs rich. Cancel them. Now. ✌️",
  },
];

const suggestions = [
  { icon: 'local-cafe' as const, label: 'Roast my Starbucks habit' },
  { icon: 'payments' as const, label: "Where's my money going?" },
  { icon: 'shopping-bag' as const, label: 'Amazon impulse check' },
];

export default function RoastScreen() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const scrollRef = useRef<ScrollView>(null);

  const send = (text: string) => {
    if (!text.trim()) return;
    const newMsg: Message = { id: Date.now().toString(), role: 'user', text: text.trim() };
    setMessages((prev) => [...prev, newMsg]);
    setInput('');
    // Simulate AI response after short delay
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString() + '_ai',
          role: 'ai',
          text: "Honestly? That's a bold question coming from someone who bought both a gym membership AND a Peloton subscription this month. Pick a lane. 🙂‍↔️",
        },
      ]);
    }, 800);
  };

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      {/* iMessage-style contact header */}
      <View style={styles.chatHeader}>
        <View style={styles.chatAvatar}>
          <MaterialIcons name="psychology" size={22} color="#fff" />
        </View>
        <View style={styles.chatHeaderInfo}>
          <Text style={styles.chatHeaderName}>Synergy AI</Text>
          <View style={styles.chatHeaderStatusRow}>
            <View style={styles.onlineDot} />
            <Text style={styles.chatHeaderStatus}>Active now</Text>
          </View>
        </View>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={90}
      >

        {/* Messages */}
        <ScrollView
          ref={scrollRef}
          style={styles.messages}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })}
        >
          {messages.map((msg) =>
            msg.role === 'user' ? (
              <View key={msg.id} style={styles.userBubbleWrap}>
                <View style={styles.userBubble}>
                  <Text style={styles.userBubbleText}>{msg.text}</Text>
                </View>
              </View>
            ) : (
              <View key={msg.id} style={styles.aiBubbleWrap}>
                <View style={styles.aiAvatar}>
                  <MaterialIcons name="psychology" size={16} color="#fff" />
                </View>
                <View style={styles.aiBubble}>
                  <Text style={styles.aiBubbleText}>{msg.text}</Text>
                </View>
              </View>
            )
          )}
          <View style={{ height: 80 }} />
        </ScrollView>

        {/* Suggestion Pills */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.suggestionScroll}
          contentContainerStyle={styles.suggestionContent}
        >
          {suggestions.map((s) => (
            <TouchableOpacity
              key={s.label}
              style={styles.suggestionPill}
              onPress={() => send(s.label)}
              activeOpacity={0.8}
            >
              <MaterialIcons name={s.icon} size={16} color={colors.primary} />
              <Text style={styles.suggestionText}>{s.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Input Bar */}
        <View style={styles.inputBar}>
          <View style={styles.inputWrap}>
            <TextInput
              style={styles.input}
              value={input}
              onChangeText={setInput}
              placeholder="Type your confession here..."
              placeholderTextColor={colors.outline}
              returnKeyType="send"
              onSubmitEditing={() => send(input)}
            />
            <TouchableOpacity style={styles.sendBtn} onPress={() => send(input)} activeOpacity={0.85}>
              <MaterialIcons name="arrow-upward" size={18} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },

  chatHeader: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    paddingHorizontal: 16, paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.outlineVariant + '40',
    backgroundColor: colors.surface,
  },
  chatAvatar: {
    width: 42, height: 42, borderRadius: 21,
    backgroundColor: colors.primary,
    alignItems: 'center', justifyContent: 'center',
  },
  chatHeaderInfo: { flex: 1 },
  chatHeaderName: { fontSize: 16, fontWeight: '700', color: colors.onSurface },
  chatHeaderStatusRow: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 2 },
  onlineDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: '#4caf50' },
  chatHeaderStatus: { fontSize: 12, color: colors.onSurfaceVariant },

  messages: { flex: 1 },
  messagesContent: { paddingHorizontal: 16, paddingTop: 8 },

  userBubbleWrap: { alignItems: 'flex-end', marginBottom: 16 },
  userBubble: {
    backgroundColor: colors.surfaceContainerHighest,
    paddingHorizontal: 20, paddingVertical: 14,
    borderRadius: 18, borderTopRightRadius: 4,
    maxWidth: '85%',
  },
  userBubbleText: { fontSize: 14, fontWeight: '500', color: colors.onSurface, lineHeight: 20 },

  aiBubbleWrap: { flexDirection: 'row', alignItems: 'flex-end', gap: 10, marginBottom: 16, maxWidth: '92%' },
  aiAvatar: {
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: colors.primary,
    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  aiBubble: {
    backgroundColor: colors.surfaceContainerLowest,
    paddingHorizontal: 20, paddingVertical: 16,
    borderRadius: 18, borderBottomLeftRadius: 4,
    borderWidth: StyleSheet.hairlineWidth, borderColor: colors.outlineVariant + '30',
    shadowColor: '#000', shadowOpacity: 0.03, shadowRadius: 10, shadowOffset: { width: 0, height: 4 },
    flex: 1,
  },
  aiBubbleText: { fontSize: 14, color: colors.onSurface, lineHeight: 22 },

  suggestionScroll: { maxHeight: 60 },
  suggestionContent: { paddingHorizontal: 16, paddingVertical: 8, gap: 8 },
  suggestionPill: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: colors.surfaceContainerLowest,
    borderWidth: StyleSheet.hairlineWidth, borderColor: colors.outlineVariant + '50',
    paddingHorizontal: 16, paddingVertical: 10, borderRadius: 999,
    shadowColor: '#000', shadowOpacity: 0.02, shadowRadius: 4, shadowOffset: { width: 0, height: 2 },
  },
  suggestionText: { fontSize: 13, fontWeight: '600', color: colors.onSurface },

  inputBar: { paddingHorizontal: 16, paddingBottom: 12, paddingTop: 8 },
  inputWrap: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: 999, paddingLeft: 16, paddingRight: 6, paddingVertical: 6,
    borderWidth: StyleSheet.hairlineWidth, borderColor: colors.outlineVariant + '20',
  },
  input: { flex: 1, fontSize: 14, fontWeight: '500', color: colors.onSurface, paddingVertical: 8 },
  sendBtn: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: colors.primary,
    alignItems: 'center', justifyContent: 'center',
    shadowColor: colors.primary, shadowOpacity: 0.3, shadowRadius: 8, shadowOffset: { width: 0, height: 4 },
  },
});
