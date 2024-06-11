import{_ as n,o as s,c as a,e as p}from"./app-ADPHbWga.js";const e={},t=p(`<h2 id="高效的差异比较算法" tabindex="-1"><a class="header-anchor" href="#高效的差异比较算法" aria-hidden="true">#</a> 高效的差异比较算法</h2><p>在计算机科学中，比较两个文本或数据序列的差异是一项重要的任务。无论是版本控制系统中的文件差异比较，还是文本编辑器中的实时文档同步，高效的差异比较算法都是必不可少的。Myers算法是其中一种经典且高效的差异比较算法，广泛应用于各类差异比较工具中(git/svn)。</p><h2 id="如何比较两个文本的差异" tabindex="-1"><a class="header-anchor" href="#如何比较两个文本的差异" aria-hidden="true">#</a> 如何比较两个文本的差异</h2><p>所谓“文本差异”，是指将字符串a经过若干次删除、新增操作后，转换为字符串b的编辑过程。</p><p>最直接的差异是依次删除a字符串中所有字符，然后依次添加b中的所有字符。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>- 1
- 2
- 3
- 4
- 5
+ 1
+ 3
+ 4
+ 5
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通常情况下，这不是一个高质量的编辑过程，它并没有体现出更新前后两个字符串的关联性。举个栗子，一个苹果被咬一口后，它是被三体人销毁后，然后新创造了一个缺了一个口的苹果吗？显然不是，它依然是以前那个苹果，只是缺少了一部分。所以一个好的编译过程应该保留a和b之间的公共部分，如下所示：</p><div class="language-tip line-numbers-mode" data-ext="tip"><pre class="language-tip"><code>  1
- 2
  3
  4
  5
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>第一种的编辑次数为9次，第二种编辑次数为1次，孰优孰劣一看便知。一个好的编辑过程，编辑次数应当尽可能少，最大程度保留它们的公共部分，也就找a转换到b的“最短编辑路径”和“最长公共子序列”。</p><h2 id="动态规划" tabindex="-1"><a class="header-anchor" href="#动态规划" aria-hidden="true">#</a> 动态规划</h2><p>基于上面的结论，定义一个二维数组D,其中D[i][j]表示A[0...i]变换到B[0...j]的最短编辑路径，i递增表示删除A[i]，j递增表示新增B[j]。</p><p>初始条件：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>    D[i][0] = i,  (0 ≤ i ≤ m)
    D[0][j] = j,  (0 ≤ j ≤ n)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>状态转移方程：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>    D[i][j] = min(D[i][j-1], D[i-1][j]) + 1,                    A[i] != B[j]
    D[i][j] = min(D[i][j-1], D[i-1][j], D[i-1][j-1]) + 1,       A[i] == B[j]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>生成编辑路径：</p><ol><li>递归回溯</li><li>反向遍历D[i][j]数组</li></ol><p>具体实现这里就不放了，感兴趣的朋友自己尝试一下。</p><h2 id="myers算法" tabindex="-1"><a class="header-anchor" href="#myers算法" aria-hidden="true">#</a> Myers算法</h2><p>Myers算法也是一种动态规划算法，它具有更优雅的实现方式，在该算法中我们需要理解以下几个概念：</p><ul><li>X值：横轴坐标</li><li>Y值：纵轴坐标</li><li>编辑图：A转换为B的路径图，当A[x]=B[y]时，对角线可用，如下图</li><li>D值：编辑图中当前点的编辑距离</li><li>K值：编辑图中当前点相对原点的截距</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>       A     B     C     A     B     B     A

    o-----o-----o-----o-----o-----o-----o-----o   0   x
    |     |     | \\   |     |     |     |     |
C   |     |     |  \\  |     |     |     |     |
    |     |     |   \\ |     |     |     |     |
    o-----o-----o-----o-----o-----o-----o-----o   1
    |     | \\   |     |     | \\   | \\   |     |
B   |     |  \\  |     |     |  \\  |  \\  |     |
    |     |   \\ |     |     |   \\ |   \\ |     |
    o-----o-----o-----o-----o-----o-----o-----o   2
    | \\   |     |     | \\   |     |     | \\   |
A   |  \\  |     |     |  \\  |     |     |  \\  |
    |   \\ |     |     |   \\ |     |     |   \\ |
    o-----o-----o-----o-----o-----o-----o-----o   3
    |     | \\   |     |     | \\   | \\   |     |
B   |     |  \\  |     |     |  \\  |  \\  |     |
    |     |   \\ |     |     |   \\ |   \\ |     |
    o-----o-----o-----o-----o-----o-----o-----o   4
    | \\   |     |     | \\   |     |     | \\   |
A   |  \\  |     |     |  \\  |     |     |  \\  |
    |   \\ |     |     |   \\ |     |     |   \\ |
    o-----o-----o-----o-----o-----o-----o-----o   5
    |     |     | \\   |     |     |     |     |
C   |     |     |  \\  |     |     |     |     |
    |     |     |   \\ |     |     |     |     |
    o-----o-----o-----o-----o-----o-----o-----o   6
    
    0     1     2     3     4     5     6     7
    
    y
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Myers算法的原理很简单，向右或向下移动时D加1，对角线移动D不变，算法执行过程中，总是记录当前的K值和X值，直到完成转换，编辑距离为D时，K可能得值为[-D,-D+2,...,D-2,D]，可使用归纳法证明：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>令 K = f(d)

当 d = 1 时，有：
    f(1)∈[-1,1]

假设 d = m 时公式成立，有：
    f(m)∈[-m,-m+2...m-2,m]

那么对[-m,-m+2...m-2,m]中每项加1或减1后，得到：
    [-m-1,-m+1,-m+3...m-3,m-1,m+1]
    = [-(m+1),-(m+1)+2,-(m+1)+4...(m+1)-4,(m+1)-2,(m+1)]

所以当 d = m 时，表达式f(m)∈[-m,-m+2...m-2,m]也成立
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>定义一个一维数组V,V[k]表示当截距为k时，X的最优解（实际编程时可能需要将k偏移为正整数后再使用）。</p><p>初始状态：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>    V[0] = 0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>状态转移方程：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>    V[k] = max(V[k-1] + 1, V[k+1])
    x = V[k]
    y = x - k
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>后续处理：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>    while(x &lt; m &amp;&amp; y &lt; n &amp;&amp; A[x] == B[y])
        x++
        y++

    V[k] = x
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>终止条件：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>    x ≥ m &amp;&amp; y ≥ n
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>代码实现（C#）</p><div class="language-csharp line-numbers-mode" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">// 比较两个字符串并打印比较结果</span>
<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Compare</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> a<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">string</span></span> b<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">string</span><span class="token punctuation">.</span><span class="token function">IsNullOrEmpty</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span> <span class="token operator">||</span> <span class="token keyword">string</span><span class="token punctuation">.</span><span class="token function">IsNullOrEmpty</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token class-name"><span class="token keyword">var</span></span> lenA <span class="token operator">=</span> a<span class="token punctuation">.</span>Length<span class="token punctuation">;</span>
    <span class="token class-name"><span class="token keyword">var</span></span> lenB <span class="token operator">=</span> b<span class="token punctuation">.</span>Length<span class="token punctuation">;</span>

    <span class="token class-name"><span class="token keyword">var</span></span> res1 <span class="token operator">=</span> <span class="token function">SES</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name"><span class="token keyword">var</span></span> res2 <span class="token operator">=</span> <span class="token function">BuildDiff</span><span class="token punctuation">(</span>lenA<span class="token punctuation">,</span> lenB<span class="token punctuation">,</span> res1<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">PrintDiff</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">,</span> res2<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 计算最小编辑距离并记录编辑历史</span>
<span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token return-type class-name">List<span class="token punctuation">&lt;</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">&gt;</span></span> <span class="token function">SES</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> a<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">string</span></span> b<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name"><span class="token keyword">var</span></span> n <span class="token operator">=</span> a<span class="token punctuation">.</span>Length<span class="token punctuation">;</span>
    <span class="token class-name"><span class="token keyword">var</span></span> m <span class="token operator">=</span> b<span class="token punctuation">.</span>Length<span class="token punctuation">;</span>

    <span class="token class-name"><span class="token keyword">var</span></span> max <span class="token operator">=</span> m <span class="token operator">+</span> n<span class="token punctuation">;</span>
    <span class="token class-name"><span class="token keyword">var</span></span> half <span class="token operator">=</span> <span class="token punctuation">(</span>max <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">;</span>

    <span class="token class-name"><span class="token keyword">var</span></span> v <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name"><span class="token keyword">int</span></span><span class="token punctuation">[</span><span class="token number">2</span> <span class="token operator">*</span> max <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token class-name"><span class="token keyword">var</span></span> vHis <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">List<span class="token punctuation">&lt;</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> d <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> d <span class="token operator">&lt;</span> max<span class="token punctuation">;</span> d<span class="token operator">++</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> k <span class="token operator">=</span> <span class="token operator">-</span>d<span class="token punctuation">;</span> k <span class="token operator">&lt;=</span> d<span class="token punctuation">;</span> k <span class="token operator">+=</span> <span class="token number">2</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name"><span class="token keyword">int</span></span> x<span class="token punctuation">,</span> y<span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">int</span></span> ki <span class="token operator">=</span> k <span class="token operator">+</span> half<span class="token punctuation">;</span>

            <span class="token keyword">if</span> <span class="token punctuation">(</span>k <span class="token operator">==</span> <span class="token operator">-</span>d <span class="token operator">||</span> k <span class="token operator">!=</span> d <span class="token operator">&amp;&amp;</span> v<span class="token punctuation">[</span>ki <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">&lt;</span> v<span class="token punctuation">[</span>ki <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                x <span class="token operator">=</span> v<span class="token punctuation">[</span>ki <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">else</span>
            <span class="token punctuation">{</span>
                x <span class="token operator">=</span> v<span class="token punctuation">[</span>ki <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            y <span class="token operator">=</span> x <span class="token operator">-</span> k<span class="token punctuation">;</span>

            <span class="token keyword">while</span> <span class="token punctuation">(</span>x <span class="token operator">&lt;</span> n <span class="token operator">&amp;&amp;</span> y <span class="token operator">&lt;</span> m <span class="token operator">&amp;&amp;</span> a<span class="token punctuation">[</span>x<span class="token punctuation">]</span> <span class="token operator">==</span> b<span class="token punctuation">[</span>y<span class="token punctuation">]</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                <span class="token operator">++</span>x<span class="token punctuation">;</span>
                <span class="token operator">++</span>y<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>

            v<span class="token punctuation">[</span>k<span class="token punctuation">]</span> <span class="token operator">=</span> x<span class="token punctuation">;</span>

            <span class="token keyword">if</span> <span class="token punctuation">(</span>x <span class="token operator">&gt;=</span> n <span class="token operator">&amp;&amp;</span> y <span class="token operator">&gt;=</span> m<span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                <span class="token keyword">return</span> vHis<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        vHis<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token range operator">..</span> v<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Exception</span><span class="token punctuation">(</span><span class="token string">&quot;Never happened&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 构建差异结果</span>
<span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token return-type class-name">List<span class="token punctuation">&lt;</span><span class="token punctuation">(</span><span class="token keyword">int</span> x<span class="token punctuation">,</span> <span class="token keyword">int</span> y<span class="token punctuation">,</span> <span class="token keyword">int</span> op<span class="token punctuation">)</span><span class="token punctuation">&gt;</span></span> <span class="token function">BuildDiff</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> x<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">int</span></span> y<span class="token punctuation">,</span> <span class="token class-name">List<span class="token punctuation">&lt;</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">&gt;</span></span> vHis<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name"><span class="token keyword">int</span></span> d <span class="token operator">=</span> vHis<span class="token punctuation">.</span>Count<span class="token punctuation">;</span>
    <span class="token class-name"><span class="token keyword">int</span></span> half <span class="token operator">=</span> <span class="token punctuation">(</span>vHis<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>Length <span class="token operator">/</span> <span class="token number">2</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">;</span>
    <span class="token class-name"><span class="token keyword">var</span></span> result <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">List<span class="token punctuation">&lt;</span><span class="token punctuation">(</span><span class="token keyword">int</span> x<span class="token punctuation">,</span> <span class="token keyword">int</span> y<span class="token punctuation">,</span> <span class="token keyword">int</span> op<span class="token punctuation">)</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">foreach</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">var</span></span> v <span class="token keyword">in</span> vHis<span class="token punctuation">.</span><span class="token function">AsEnumerable</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Reverse</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name"><span class="token keyword">int</span></span> k <span class="token operator">=</span> x <span class="token operator">-</span> y<span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">int</span></span> ki <span class="token operator">=</span> k <span class="token operator">+</span> half<span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">int</span></span> preX<span class="token punctuation">,</span> preK<span class="token punctuation">;</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span>k <span class="token operator">==</span> <span class="token operator">-</span>d <span class="token operator">||</span> k <span class="token operator">!=</span> d <span class="token operator">&amp;&amp;</span> v<span class="token punctuation">[</span>ki <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">&lt;</span> v<span class="token punctuation">[</span>ki <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            preX <span class="token operator">=</span> v<span class="token punctuation">[</span>ki <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
            preK <span class="token operator">=</span> k <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">else</span>
        <span class="token punctuation">{</span>
            preX <span class="token operator">=</span> v<span class="token punctuation">[</span>ki <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
            preK <span class="token operator">=</span> k <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token class-name"><span class="token keyword">int</span></span> preY <span class="token operator">=</span> preX <span class="token operator">-</span> preK<span class="token punctuation">;</span>

        <span class="token keyword">while</span> <span class="token punctuation">(</span>preX <span class="token operator">&lt;</span> x <span class="token operator">&amp;&amp;</span> preY <span class="token operator">&lt;</span> y<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            result<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token punctuation">(</span>x<span class="token operator">--</span><span class="token punctuation">,</span> y<span class="token operator">--</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span>preX <span class="token operator">&lt;</span> x<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            result<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span> y<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">else</span>
        <span class="token punctuation">{</span>
            result<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span> y<span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        x <span class="token operator">=</span> preX<span class="token punctuation">;</span>
        y <span class="token operator">=</span> preY<span class="token punctuation">;</span>
        <span class="token operator">--</span>d<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> result<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 打印差异结果</span>
<span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">PrintDiff</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> a<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">string</span></span> b<span class="token punctuation">,</span> <span class="token class-name">List<span class="token punctuation">&lt;</span><span class="token punctuation">(</span><span class="token keyword">int</span> x<span class="token punctuation">,</span> <span class="token keyword">int</span> y<span class="token punctuation">,</span> <span class="token keyword">int</span> op<span class="token punctuation">)</span><span class="token punctuation">&gt;</span></span> result<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">foreach</span> <span class="token punctuation">(</span><span class="token keyword">var</span> <span class="token punctuation">(</span>x<span class="token punctuation">,</span> y<span class="token punctuation">,</span> op<span class="token punctuation">)</span> <span class="token keyword">in</span> result<span class="token punctuation">.</span><span class="token function">AsEnumerable</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Reverse</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">switch</span> <span class="token punctuation">(</span>op<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">case</span> <span class="token number">0</span><span class="token punctuation">:</span>
                Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token interpolation-string"><span class="token string">$&quot;  </span><span class="token interpolation"><span class="token punctuation">{</span><span class="token expression language-csharp">a<span class="token punctuation">[</span>x <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span></span><span class="token punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">break</span><span class="token punctuation">;</span>
            <span class="token keyword">case</span> <span class="token number">1</span><span class="token punctuation">:</span>
                Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token interpolation-string"><span class="token string">$&quot;- </span><span class="token interpolation"><span class="token punctuation">{</span><span class="token expression language-csharp">a<span class="token punctuation">[</span>x <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span></span><span class="token punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">break</span><span class="token punctuation">;</span>
            <span class="token keyword">case</span> <span class="token number">2</span><span class="token punctuation">:</span>
                Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token interpolation-string"><span class="token string">$&quot;+ </span><span class="token interpolation"><span class="token punctuation">{</span><span class="token expression language-csharp">b<span class="token punctuation">[</span>y <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span></span><span class="token punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">break</span><span class="token punctuation">;</span>
            <span class="token keyword">default</span><span class="token punctuation">:</span>
                <span class="token keyword">break</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>不难看出，当前算法实现的时间复杂度为O(max(n,m)+D²)，由于需要记录编辑历史用于路径回溯，空间复杂度为O((n+m)D)，其中n为字符串a的长度，m为字符串b的长度。那么还能不能继续优化呢？往下看。</p><h2 id="myers算法线性空间优化" tabindex="-1"><a class="header-anchor" href="#myers算法线性空间优化" aria-hidden="true">#</a> Myers算法线性空间优化</h2><p>有了上面的基础，试想一下，既然编辑图可以从左上往右下走，那么能不能从右下往左上走呢？感兴趣的朋友可以自行了解，这里提供一些思路：</p><ul><li>正向操作和反向操作同时进行，相同k值下当正向操作的(x,y)不小于反向操作的(x,y)时，则完成最小编辑距离的计算</li><li>采用分治的策略，得到中间d的坐标(i,j)后，再对A[0...i]和B[0...j]、A[i+1...n]和B[j+1...m]进行相同的操作</li></ul>`,39),o=[t];function c(i,l){return s(),a("div",null,o)}const r=n(e,[["render",c],["__file","Myerssuanfayuanli.html.vue"]]);export{r as default};
