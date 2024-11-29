// 添加一个简单的提示，确认脚本在运行
console.log('emoji装饰器已启动！');

function addEmojis() {
    const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        null,
        false
    );

    const emojis = ['💖', '✨', '🎄', '🎀', '🌟','🎁','⭐','🦃','🎅','🤗','🎉','🎊','🎈'];
    
    let node;
    while (node = walker.nextNode()) {
        if (node.parentElement.tagName === 'SCRIPT' || 
            node.parentElement.tagName === 'STYLE') {
            continue;
        }
        
        const text = node.textContent.trim();
        
        // 检测是否包含中文
        const hasChinese = /[\u4e00-\u9fa5]/.test(text);
        
        if (hasChinese && text.length > 5) {
            let newText = '';
            const fixedInterval = 6; // 固定每6个字符后考虑插入表情
            let charCount = 0;
            let inEnglishWord = false; // 标记是否在英文单词内
            
            for (let i = 0; i < text.length; i++) {
                const char = text[i];
                newText += char;
                
                // 检查是否在英文单词内
                if (/[a-zA-Z]/.test(char)) {
                    inEnglishWord = true;
                    continue;
                } else if (inEnglishWord && /\s/.test(char)) {
                    // 英文单词结束
                    inEnglishWord = false;
                }
                
                // 如果在英文单词内，跳过emoji插入
                if (inEnglishWord) continue;
                
                // 只对中文字符计数
                if (/[\u4e00-\u9fa5]/.test(char)) {
                    charCount++;
                    
                    // 在固定间隔处添加表情
                    if (charCount % fixedInterval === 0) {
                        if (Math.random() < 0.5) {
                            newText += emojis[Math.floor(Math.random() * emojis.length)];
                        }
                    }
                }
            }
            node.textContent = newText;
        } else if (!hasChinese) {
            // 英文文本处理保持不变
            const words = text.split(' ');
            if (words.length > 3) {
                const decoratedText = words.map(word => {
                    if (Math.random() < 0.2) {
                        return word + emojis[Math.floor(Math.random() * emojis.length)];
                    }
                    return word;
                }).join(' ');
                
                node.textContent = decoratedText;
            }
        }
    }
}

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', addEmojis);
setTimeout(addEmojis, 1000);