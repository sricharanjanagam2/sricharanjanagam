#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

#define MAX_MEMORY_LENGTH 100
#define STM_MAX_SIZE 5
#define REPETITION_THRESHOLD 3
#define MAX_MEMORIES 50

// ============== DATA STRUCTURES ==============

// Node for Linked List (LTM)
typedef struct LLNode {
    char memory[MAX_MEMORY_LENGTH];
    int repetition_count;
    struct LLNode* next;
} LLNode;

// Queue Node (STM)
typedef struct QueueNode {
    char memory[MAX_MEMORY_LENGTH];
    int repetition_count;
} QueueNode;

// Queue structure (STM)
typedef struct {
    QueueNode* items;
    int front;
    int rear;
    int size;
    int max_size;
} Queue;

// Stack (Forgotten Memory)
typedef struct {
    char memories[MAX_MEMORIES][MAX_MEMORY_LENGTH];
    int repetition_counts[MAX_MEMORIES];
    int top;
} Stack;

// Linked List (LTM)
typedef struct {
    LLNode* head;
    int size;
} LinkedList;

// Global Memory System
typedef struct {
    Queue* stm;
    LinkedList* ltm;
    Stack* forgotten;
    int total_repetitions;
} MemorySystem;

// ============== QUEUE FUNCTIONS ==============

Queue* createQueue(int maxSize) {
    Queue* q = (Queue*)malloc(sizeof(Queue));
    q->items = (QueueNode*)malloc(sizeof(QueueNode) * maxSize);
    q->max_size = maxSize;
    q->front = 0;
    q->rear = -1;
    q->size = 0;
    return q;
}

int enqueue(Queue* q, const char* memory, int count) {
    if (q->size >= q->max_size) {
        return 0; // Queue is full
    }
    q->rear = (q->rear + 1) % q->max_size;
    strcpy(q->items[q->rear].memory, memory);
    q->items[q->rear].repetition_count = count;
    q->size++;
    return 1; // Success
}

int dequeue(Queue* q, char* memory, int* count) {
    if (q->size <= 0) {
        return 0; // Queue is empty
    }
    strcpy(memory, q->items[q->front].memory);
    *count = q->items[q->front].repetition_count;
    q->front = (q->front + 1) % q->max_size;
    q->size--;
    return 1; // Success
}

int isQueueFull(Queue* q) {
    return q->size >= q->max_size;
}

int isQueueEmpty(Queue* q) {
    return q->size == 0;
}

void displayQueue(Queue* q) {
    if (q->size == 0) {
        printf("   [Empty]\n");
        return;
    }
    printf("   ");
    for (int i = 0; i < q->size; i++) {
        int idx = (q->front + i) % q->max_size;
        printf("[%s ×%d]", q->items[idx].memory, q->items[idx].repetition_count);
        if (i < q->size - 1) printf(" → ");
    }
    printf("\n");
}

void freeQueue(Queue* q) {
    free(q->items);
    free(q);
}

// ============== STACK FUNCTIONS ==============

Stack* createStack() {
    Stack* s = (Stack*)malloc(sizeof(Stack));
    s->top = -1;
    return s;
}

void push(Stack* s, const char* memory, int count) {
    if (s->top < MAX_MEMORIES - 1) {
        s->top++;
        strcpy(s->memories[s->top], memory);
        s->repetition_counts[s->top] = count;
    }
}

int pop(Stack* s, char* memory, int* count) {
    if (s->top < 0) {
        return 0; // Stack is empty
    }
    strcpy(memory, s->memories[s->top]);
    *count = s->repetition_counts[s->top];
    s->top--;
    return 1; // Success
}

int isStackEmpty(Stack* s) {
    return s->top < 0;
}

void displayStack(Stack* s) {
    if (s->top < 0) {
        printf("   [Empty]\n");
        return;
    }
    for (int i = s->top; i >= 0; i--) {
        printf("   ┌─ [%s ×%d] %s\n", 
               s->memories[i], 
               s->repetition_counts[i],
               (i == s->top) ? "← TOP" : "");
    }
}

void freeStack(Stack* s) {
    free(s);
}

// ============== LINKED LIST FUNCTIONS ==============

LinkedList* createLinkedList() {
    LinkedList* ll = (LinkedList*)malloc(sizeof(LinkedList));
    ll->head = NULL;
    ll->size = 0;
    return ll;
}

void insertLLNode(LinkedList* ll, const char* memory, int count) {
    LLNode* newNode = (LLNode*)malloc(sizeof(LLNode));
    strcpy(newNode->memory, memory);
    newNode->repetition_count = count;
    newNode->next = NULL;

    if (ll->head == NULL) {
        ll->head = newNode;
    } else {
        LLNode* current = ll->head;
        while (current->next != NULL) {
            current = current->next;
        }
        current->next = newNode;
    }
    ll->size++;
}

int findAndRemoveLLNode(LinkedList* ll, const char* memory) {
    if (ll->head == NULL) return 0;

    if (strcmp(ll->head->memory, memory) == 0) {
        LLNode* temp = ll->head;
        ll->head = ll->head->next;
        free(temp);
        ll->size--;
        return 1;
    }

    LLNode* current = ll->head;
    while (current->next != NULL) {
        if (strcmp(current->next->memory, memory) == 0) {
            LLNode* temp = current->next;
            current->next = temp->next;
            free(temp);
            ll->size--;
            return 1;
        }
        current = current->next;
    }
    return 0;
}

void displayLinkedList(LinkedList* ll) {
    if (ll->head == NULL) {
        printf("   [Empty]\n");
        return;
    }
    printf("   ");
    LLNode* current = ll->head;
    while (current != NULL) {
        printf("[%s ×%d]", current->memory, current->repetition_count);
        if (current->next != NULL) printf(" → ");
        current = current->next;
    }
    printf("\n");
}

void freeLinkedList(LinkedList* ll) {
    LLNode* current = ll->head;
    while (current != NULL) {
        LLNode* temp = current;
        current = current->next;
        free(temp);
    }
    free(ll);
}

int isLinkedListEmpty(LinkedList* ll) {
    return ll->head == NULL;
}

// ============== MEMORY SYSTEM FUNCTIONS ==============

MemorySystem* initMemorySystem() {
    MemorySystem* ms = (MemorySystem*)malloc(sizeof(MemorySystem));
    ms->stm = createQueue(STM_MAX_SIZE);
    ms->ltm = createLinkedList();
    ms->forgotten = createStack();
    ms->total_repetitions = 0;
    return ms;
}

int findMemoryInSTM(Queue* q, const char* memory) {
    for (int i = 0; i < q->size; i++) {
        int idx = (q->front + i) % q->max_size;
        if (strcmp(q->items[idx].memory, memory) == 0) {
            return idx;
        }
    }
    return -1;
}

int findMemoryInLTM(LinkedList* ll, const char* memory) {
    LLNode* current = ll->head;
    while (current != NULL) {
        if (strcmp(current->memory, memory) == 0) {
            return 1;
        }
        current = current->next;
    }
    return 0;
}

int findMemoryInForgotten(Stack* s, const char* memory) {
    for (int i = 0; i <= s->top; i++) {
        if (strcmp(s->memories[i], memory) == 0) {
            return i;
        }
    }
    return -1;
}

void addMemory(MemorySystem* ms, const char* memory) {
    // Check if memory already exists
    int stmIdx = findMemoryInSTM(ms->stm, memory);
    int ltmExists = findMemoryInLTM(ms->ltm, memory);
    int forgottenIdx = findMemoryInForgotten(ms->forgotten, memory);

    if (stmIdx != -1) {
        // In STM - increase repetition count
        ms->stm->items[stmIdx].repetition_count++;
        ms->total_repetitions++;

        // Check if should move to LTM
        if (ms->stm->items[stmIdx].repetition_count >= REPETITION_THRESHOLD) {
            int count = ms->stm->items[stmIdx].repetition_count;
            char tempMemory[MAX_MEMORY_LENGTH];
            strcpy(tempMemory, memory);
            
            // Remove from STM and add to LTM
            ms->stm->items[stmIdx].memory[0] = '\0'; // Mark as empty
            insertLLNode(ms->ltm, tempMemory, count);
            
            // Reorganize queue
            Queue* newQueue = createQueue(ms->stm->max_size);
            char mem[MAX_MEMORY_LENGTH];
            int cnt;
            while (dequeue(ms->stm, mem, &cnt) && strcmp(mem, "") != 0) {
                if (strcmp(mem, memory) != 0) {
                    enqueue(newQueue, mem, cnt);
                }
            }
            freeQueue(ms->stm);
            ms->stm = newQueue;
            
            printf("\n✨ Memory promoted to Long-Term Memory!\n\n");
        }
    } else if (ltmExists) {
        // In LTM - increase repetition count
        LLNode* current = ms->ltm->head;
        while (current != NULL) {
            if (strcmp(current->memory, memory) == 0) {
                current->repetition_count++;
                ms->total_repetitions++;
                break;
            }
            current = current->next;
        }
    } else if (forgottenIdx != -1) {
        // In Forgotten - increase repetition count
        ms->forgotten->repetition_counts[forgottenIdx]++;
        ms->total_repetitions++;
    } else {
        // New memory
        if (isQueueFull(ms->stm)) {
            // STM is full, move oldest to Forgotten or LTM
            char oldest[MAX_MEMORY_LENGTH];
            int oldestCount;
            dequeue(ms->stm, oldest, &oldestCount);

            if (oldestCount < REPETITION_THRESHOLD) {
                // Not important, forget it
                push(ms->forgotten, oldest, oldestCount);
                printf("\n🚫 Memory forgotten (low importance)!\n\n");
            } else {
                // Important, move to LTM
                insertLLNode(ms->ltm, oldest, oldestCount);
                printf("\n📚 Memory moved to Long-Term Memory (auto-promotion)!\n\n");
            }
        }

        // Add new memory to STM
        enqueue(ms->stm, memory, 1);
    }
}

void recallMemory(MemorySystem* ms) {
    if (isStackEmpty(ms->forgotten)) {
        printf("\n❌ No forgotten memories to recall!\n\n");
        return;
    }

    char memory[MAX_MEMORY_LENGTH];
    int count;
    pop(ms->forgotten, memory, &count);

    count++;
    ms->total_repetitions++;

    // If STM is full, remove oldest first
    if (isQueueFull(ms->stm)) {
        char oldest[MAX_MEMORY_LENGTH];
        int oldestCount;
        dequeue(ms->stm, oldest, &oldestCount);

        if (oldestCount < REPETITION_THRESHOLD) {
            push(ms->forgotten, oldest, oldestCount);
        } else {
            insertLLNode(ms->ltm, oldest, oldestCount);
        }
    }

    // Add recalled memory back to STM
    enqueue(ms->stm, memory, count);
    printf("\n🔄 Memory recalled and restored to Short-Term Memory!\n\n");
}

void displayStats(MemorySystem* ms) {
    printf("\n╔══════════════════════════════════════╗\n");
    printf("║          📊 MEMORY STATISTICS        ║\n");
    printf("╠══════════════════════════════════════╣\n");
    printf("║ Short-Term Memory (Queue):  %2d/%-2d   ║\n", 
           ms->stm->size, ms->stm->max_size);
    printf("║ Long-Term Memory (Linked List): %2d  ║\n", ms->ltm->size);
    printf("║ Forgotten Memories (Stack):     %2d  ║\n", ms->forgotten->top + 1);
    printf("║ Total Repetitions:            %3d  ║\n", ms->total_repetitions);
    printf("╚══════════════════════════════════════╝\n\n");
}

void displayMemorySections(MemorySystem* ms) {
    printf("\n╔════════════════════════════════════════════════════════════════╗\n");
    printf("║         🧠 SHORT-TERM MEMORY (QUEUE - FIFO)                  ║\n");
    printf("╠════════════════════════════════════════════════════════════════╣\n");
    printf("║ [Limited to %d items, oldest forgotten when full]           ║\n", STM_MAX_SIZE);
    printf("╟────────────────────────────────────────────────────────────────╢\n");
    displayQueue(ms->stm);
    printf("╚════════════════════════════════════════════════════════════════╝\n\n");

    printf("╔════════════════════════════════════════════════════════════════╗\n");
    printf("║      📚 LONG-TERM MEMORY (LINKED LIST - Dynamic)             ║\n");
    printf("╠════════════════════════════════════════════════════════════════╣\n");
    printf("║ [Stores %d important memories - promoted at 3+ repetitions] ║\n", ms->ltm->size);
    printf("╟────────────────────────────────────────────────────────────────╢\n");
    displayLinkedList(ms->ltm);
    printf("╚════════════════════════════════════════════════════════════════╝\n\n");

    printf("╔════════════════════════════════════════════════════════════════╗\n");
    printf("║       🚫 FORGOTTEN MEMORY (STACK - LIFO) [%d items]         ║\n", ms->forgotten->top + 1);
    printf("╠════════════════════════════════════════════════════════════════╣\n");
    printf("║ [Recoverable memories - last forgotten can be recalled]      ║\n");
    printf("╟────────────────────────────────────────────────────────────────╢\n");
    displayStack(ms->forgotten);
    printf("╚════════════════════════════════════════════════════════════════╝\n\n");
}

void findTopMemories(MemorySystem* ms) {
    typedef struct {
        char memory[MAX_MEMORY_LENGTH];
        int count;
        char location[20];
    } Memory;

    Memory memories[MAX_MEMORIES];
    int count = 0;

    // Collect from STM
    for (int i = 0; i < ms->stm->size; i++) {
        int idx = (ms->stm->front + i) % ms->stm->max_size;
        strcpy(memories[count].memory, ms->stm->items[idx].memory);
        memories[count].count = ms->stm->items[idx].repetition_count;
        strcpy(memories[count].location, "STM");
        count++;
    }

    // Collect from LTM
    LLNode* current = ms->ltm->head;
    while (current != NULL) {
        strcpy(memories[count].memory, current->memory);
        memories[count].count = current->repetition_count;
        strcpy(memories[count].location, "LTM");
        count++;
        current = current->next;
    }

    // Collect from Forgotten
    for (int i = 0; i <= ms->forgotten->top; i++) {
        strcpy(memories[count].memory, ms->forgotten->memories[i]);
        memories[count].count = ms->forgotten->repetition_counts[i];
        strcpy(memories[count].location, "Forgotten");
        count++;
    }

    if (count == 0) {
        printf("No memories to rank.\n");
        return;
    }

    // Sort by count (descending)
    for (int i = 0; i < count - 1; i++) {
        for (int j = 0; j < count - i - 1; j++) {
            if (memories[j].count < memories[j + 1].count) {
                Memory temp = memories[j];
                memories[j] = memories[j + 1];
                memories[j + 1] = temp;
            }
        }
    }

    // Display top 5
    printf("╔════════════════════════════════════════════════════════════════╗\n");
    printf("║           🏆 TOP REPEATED MEMORIES                           ║\n");
    printf("╠════════════════════════════════════════════════════════════════╣\n");

    int maxDisplay = (count > 5) ? 5 : count;
    for (int i = 0; i < maxDisplay; i++) {
        printf("║ #%d %-50s %2dx %-6s ║\n", 
               i + 1, 
               memories[i].memory, 
               memories[i].count,
               memories[i].location);
    }
    printf("╚════════════════════════════════════════════════════════════════╝\n\n");
}

void displayMenu() {
    printf("\n╔════════════════════════════════════════════════════════════════╗\n");
    printf("║              🧠 HUMAN MEMORY SIMULATOR - MENU                 ║\n");
    printf("╠════════════════════════════════════════════════════════════════╣\n");
    printf("║  1. Add a new memory                                          ║\n");
    printf("║  2. Recall a forgotten memory                                 ║\n");
    printf("║  3. View all memories by type                                 ║\n");
    printf("║  4. View memory statistics                                    ║\n");
    printf("║  5. View top repeated memories                                ║\n");
    printf("║  6. Clear all memories                                        ║\n");
    printf("║  7. Exit                                                      ║\n");
    printf("╚════════════════════════════════════════════════════════════════╝\n");
    printf("Enter your choice (1-7): ");
}

void initializeWithExamples(MemorySystem* ms) {
    addMemory(ms, "Learning to ride a bike");
    addMemory(ms, "First day of school");
    addMemory(ms, "Favorite meal");
}

void clearSystem(MemorySystem* ms) {
    freeQueue(ms->stm);
    freeLinkedList(ms->ltm);
    freeStack(ms->forgotten);
    ms->stm = createQueue(STM_MAX_SIZE);
    ms->ltm = createLinkedList();
    ms->forgotten = createStack();
    ms->total_repetitions = 0;
    printf("\n✅ All memories cleared!\n\n");
}

int main() {
    printf("\n");
    printf("╔════════════════════════════════════════════════════════════════╗\n");
    printf("║                                                                ║\n");
    printf("║          🧠 WELCOME TO HUMAN MEMORY SIMULATOR 🧠              ║\n");
    printf("║                                                                ║\n");
    printf("║   Explore how data structures model human memory behavior     ║\n");
    printf("║                                                                ║\n");
    printf("╚════════════════════════════════════════════════════════════════╝\n");

    MemorySystem* ms = initMemorySystem();
    initializeWithExamples(ms);

    printf("\n✅ System initialized with 3 example memories!\n");
    printf("   - Learning to ride a bike\n");
    printf("   - First day of school\n");
    printf("   - Favorite meal\n");

    int choice;
    char memory[MAX_MEMORY_LENGTH];

    while (1) {
        displayMenu();
        scanf("%d", &choice);
        getchar(); // Consume newline

        switch (choice) {
            case 1:
                printf("\nEnter a memory: ");
                fgets(memory, MAX_MEMORY_LENGTH, stdin);
                // Remove trailing newline
                size_t len = strlen(memory);
                if (len > 0 && memory[len - 1] == '\n') {
                    memory[len - 1] = '\0';
                }
                
                if (strlen(memory) > 0) {
                    addMemory(ms, memory);
                    printf("✅ Memory added to Short-Term Memory!\n\n");
                } else {
                    printf("❌ Invalid input!\n\n");
                }
                break;

            case 2:
                recallMemory(ms);
                break;

            case 3:
                displayMemorySections(ms);
                break;

            case 4:
                displayStats(ms);
                break;

            case 5:
                findTopMemories(ms);
                break;

            case 6:
                printf("\n⚠️  Are you sure? (y/n): ");
                char confirm;
                scanf("%c", &confirm);
                getchar();
                if (confirm == 'y' || confirm == 'Y') {
                    clearSystem(ms);
                } else {
                    printf("Operation cancelled.\n\n");
                }
                break;

            case 7:
                printf("\n👋 Thank you for using Human Memory Simulator!\n");
                printf("   Keep those memories alive! 🧠\n\n");
                
                freeQueue(ms->stm);
                freeLinkedList(ms->ltm);
                freeStack(ms->forgotten);
                free(ms);
                return 0;

            default:
                printf("\n❌ Invalid choice! Please enter 1-7.\n\n");
        }
    }

    return 0;
}
