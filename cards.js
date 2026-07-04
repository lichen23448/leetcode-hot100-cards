const rawProblems = [
  {
    slug: "two-sum",
    title: "两数之和",
    english: "Two Sum",
    difficulty: "Easy",
    group: "哈希",
    topic: "哈希表",
    method: "HashMap",
    goal: "找到两个数的下标，使它们相加等于 target",
    complexity: "时间 O(n)，空间 O(n)",
    description: "给定数组和目标值，返回两个不同元素的下标，使这两个数相加等于目标值。",
    example: "输入：nums = [2, 7, 11, 15], target = 9\n输出：[0, 1]\n解释：2 + 7 = 9",
    thought: "遍历数组时，用 HashMap 记录已经见过的数字；当前数是 x，就去找 target - x 是否出现过。",
    explanation: ["暴力做法要两层循环。", "HashMap 可以把“找另一个数”变成快速查询。", "先查再放，能避免同一个元素被重复使用。"],
    code: `import java.util.HashMap;
import java.util.Map;

class Solution {
    public int[] twoSum(int[] nums, int target) {
        // key 是数字，value 是这个数字的下标
        Map<Integer, Integer> map = new HashMap<>();

        for (int i = 0; i < nums.length; i++) {
            // 当前数需要搭配 need 才能得到 target
            int need = target - nums[i];

            // 如果 need 之前出现过，就找到答案
            if (map.containsKey(need)) {
                return new int[]{map.get(need), i};
            }

            // 记录当前数字，留给后面的数字匹配
            map.put(nums[i], i);
        }

        return new int[0];
    }
}`
  },
  {
    slug: "group-anagrams",
    title: "字母异位词分组",
    english: "Group Anagrams",
    difficulty: "Medium",
    group: "哈希",
    topic: "哈希表",
    method: "排序 + HashMap",
    goal: "把字母相同但顺序不同的字符串分到同一组",
    complexity: "时间 O(n * k log k)，空间 O(n * k)",
    description: "给定字符串数组，把所有字母组成相同的字符串分到同一组。",
    example: "输入：strs = [\"eat\", \"tea\", \"tan\", \"ate\", \"nat\", \"bat\"]\n输出：[[\"eat\", \"tea\", \"ate\"], [\"tan\", \"nat\"], [\"bat\"]]",
    thought: "把每个字符串排序后作为分组 key；异位词排序后的结果一定相同。",
    explanation: ["eat、tea、ate 排序后都是 aet。", "用排序结果作为 HashMap 的 key。", "最后返回 map 中所有分组。"],
    code: `import java.util.*;

class Solution {
    public List<List<String>> groupAnagrams(String[] strs) {
        // key 是排序后的字符串，value 是属于这一组的原字符串
        Map<String, List<String>> map = new HashMap<>();

        for (String s : strs) {
            char[] chars = s.toCharArray();
            Arrays.sort(chars);

            // 异位词排序后会得到同一个 key
            String key = new String(chars);
            map.computeIfAbsent(key, k -> new ArrayList<>()).add(s);
        }

        return new ArrayList<>(map.values());
    }
}`
  },
  {
    slug: "longest-consecutive-sequence",
    title: "最长连续序列",
    english: "Longest Consecutive Sequence",
    difficulty: "Medium",
    group: "哈希",
    topic: "哈希集合",
    method: "HashSet",
    goal: "找出最长的连续数字序列长度",
    complexity: "时间 O(n)，空间 O(n)",
    description: "给一个未排序数组，返回最长连续数字序列的长度。",
    example: "输入：nums = [100, 4, 200, 1, 3, 2]\n输出：4\n解释：最长连续序列是 [1, 2, 3, 4]",
    thought: "把所有数字放进 HashSet，只从没有前驱 num - 1 的数字开始向后统计连续长度。",
    explanation: ["如果 num - 1 存在，num 就不是起点。", "只从真正的起点开始向后数。", "每个数字只会被有效访问有限次。"],
    code: `import java.util.HashSet;
import java.util.Set;

class Solution {
    public int longestConsecutive(int[] nums) {
        // set 用来快速判断某个数字是否存在
        Set<Integer> set = new HashSet<>();
        for (int num : nums) {
            set.add(num);
        }

        int ans = 0;

        for (int num : set) {
            // 只有没有前驱时，num 才是连续序列的起点
            if (!set.contains(num - 1)) {
                int cur = num;
                int len = 1;

                // 从起点一路向后数
                while (set.contains(cur + 1)) {
                    cur++;
                    len++;
                }

                ans = Math.max(ans, len);
            }
        }

        return ans;
    }
}`
  },
  {
    slug: "move-zeroes",
    title: "移动零",
    english: "Move Zeroes",
    difficulty: "Easy",
    group: "双指针",
    topic: "双指针",
    method: "双指针",
    goal: "把 0 移到末尾，同时保持非零数顺序不变",
    complexity: "时间 O(n)，空间 O(1)",
    description: "给一个数组，把所有 0 移到末尾，同时保持非零元素的原始顺序。",
    example: "输入：nums = [0, 1, 0, 3, 12]\n输出：[1, 3, 12, 0, 0]",
    thought: "fast 负责找非零数，slow 负责记录非零数应该放的位置，找到非零数就交换过去。",
    explanation: ["slow 指向下一个非零数应该放的位置。", "fast 从左到右扫描数组。", "遇到非零数就交换到 slow 位置，然后 slow 后移。"],
    code: `class Solution {
    public void moveZeroes(int[] nums) {
        // slow 表示下一个非零数应该放到的位置
        int slow = 0;

        // fast 负责从左到右寻找非零数
        for (int fast = 0; fast < nums.length; fast++) {
            if (nums[fast] != 0) {
                // 把非零数交换到 slow 位置
                int temp = nums[slow];
                nums[slow] = nums[fast];
                nums[fast] = temp;

                slow++;
            }
        }
    }
}`
  },
  {
    slug: "container-with-most-water",
    title: "盛最多水的容器",
    english: "Container With Most Water",
    difficulty: "Medium",
    group: "双指针",
    topic: "双指针",
    method: "双指针",
    goal: "找两条线，使它们和 x 轴组成的容器装水最多",
    complexity: "时间 O(n)，空间 O(1)",
    description: "给一个高度数组，选择两条竖线，使它们组成的容器面积最大。",
    example: "输入：height = [1,8,6,2,5,4,8,3,7]\n输出：49\n解释：下标 1 和 8 组成的面积是 7 * 7 = 49",
    thought: "左右指针从两端开始，每次算面积，然后移动较矮的那一边，因为装水高度由短板决定。",
    diagram: "./diagrams/container-with-most-water.svg",
    diagramAlt: "盛最多水的容器图解",
    explanation: ["面积 = 宽度 * 较矮高度。", "指针向中间移动时，宽度一定变小。", "想让面积变大，只能尝试让短板变高。"],
    code: `class Solution {
    public int maxArea(int[] height) {
        int left = 0;
        int right = height.length - 1;
        int ans = 0;

        while (left < right) {
            // 当前容器宽度
            int width = right - left;

            // 装水高度由较矮的线决定
            int h = Math.min(height[left], height[right]);
            ans = Math.max(ans, width * h);

            // 移动短板，才有机会得到更高的水位
            if (height[left] < height[right]) {
                left++;
            } else {
                right--;
            }
        }

        return ans;
    }
}`
  },
  {
    slug: "three-sum",
    title: "三数之和",
    english: "3Sum",
    difficulty: "Medium",
    group: "双指针",
    topic: "排序 + 双指针",
    method: "排序 + 双指针",
    goal: "找出所有不重复的三元组，使三数之和为 0",
    complexity: "时间 O(n²)，空间 O(1)，不算返回结果",
    description: "给一个整数数组，找出所有不重复的三元组，使三数之和等于 0。",
    example: "输入：nums = [-1, 0, 1, 2, -1, -4]\n输出：[[-1, -1, 2], [-1, 0, 1]]",
    thought: "先排序，固定一个数 nums[i]，再用左右指针在后面找两个数，让三数之和等于 0。",
    explanation: ["排序后，固定一个数，剩下就是两数之和。", "sum 小了就 left 右移，sum 大了就 right 左移。", "固定数、left、right 都要跳过重复值。"],
    code: `import java.util.*;

class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        List<List<Integer>> ans = new ArrayList<>();
        Arrays.sort(nums);

        for (int i = 0; i < nums.length - 2; i++) {
            // 固定数重复会产生重复答案
            if (i > 0 && nums[i] == nums[i - 1]) {
                continue;
            }

            int left = i + 1;
            int right = nums.length - 1;

            while (left < right) {
                int sum = nums[i] + nums[left] + nums[right];

                if (sum == 0) {
                    ans.add(Arrays.asList(nums[i], nums[left], nums[right]));

                    // 跳过重复的 left 和 right
                    while (left < right && nums[left] == nums[left + 1]) {
                        left++;
                    }
                    while (left < right && nums[right] == nums[right - 1]) {
                        right--;
                    }

                    left++;
                    right--;
                } else if (sum < 0) {
                    left++;
                } else {
                    right--;
                }
            }
        }

        return ans;
    }
}`
  },
  {
    slug: "trapping-rain-water",
    title: "接雨水",
    english: "Trapping Rain Water",
    difficulty: "Hard",
    group: "双指针",
    topic: "双指针",
    method: "双指针",
    goal: "计算柱子之间一共能接多少雨水",
    complexity: "时间 O(n)，空间 O(1)",
    description: "给一个柱子高度数组，计算下雨后这些柱子之间能接多少水。",
    example: "输入：height = [0,1,0,2,1,0,1,3,2,1,2,1]\n输出：6",
    thought: "每个位置能接多少水，取决于它左边最高柱子和右边最高柱子中较矮的那个，再减去当前高度。",
    diagram: "./diagrams/trapping-rain-water.svg",
    diagramAlt: "接雨水图解",
    explanation: ["一个位置能接水，左右两边都要有更高的柱子。", "水位由左右最高柱子的较矮者决定。", "双指针每次处理短板那边，因为那边水位已经确定。"],
    code: `class Solution {
    public int trap(int[] height) {
        int left = 0;
        int right = height.length - 1;
        int leftMax = 0;
        int rightMax = 0;
        int ans = 0;

        while (left < right) {
            // 维护左右两侧目前看到的最高柱子
            leftMax = Math.max(leftMax, height[left]);
            rightMax = Math.max(rightMax, height[right]);

            if (leftMax < rightMax) {
                // 左边短板确定，left 位置可以结算
                ans += leftMax - height[left];
                left++;
            } else {
                // 右边短板确定，right 位置可以结算
                ans += rightMax - height[right];
                right--;
            }
        }

        return ans;
    }
}`
  },
  {
    slug: "longest-substring-without-repeating-characters",
    title: "无重复字符的最长子串",
    english: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    group: "滑动窗口",
    topic: "滑动窗口",
    method: "滑动窗口 + HashSet",
    goal: "找到不含重复字符的最长连续子串长度",
    complexity: "时间 O(n)，空间 O(k)",
    description: "给一个字符串 `s`，找出其中不含重复字符的最长子串长度。",
    example: "输入：s = \"abcabcbb\"\n输出：3\n解释：最长无重复子串是 \"abc\"",
    thought: "用 left 和 right 维护滑动窗口，用 HashSet 记录窗口内字符；right 遇到重复字符时移动 left，直到窗口重新无重复。",
    explanation: [
      "窗口里始终只放不重复的字符。",
      "如果 s[right] 没出现过，就放进窗口并更新答案。",
      "如果 s[right] 已经出现过，就不断移动 left，把左边字符移出窗口，直到 s[right] 不再重复。"
    ],
    code: `import java.util.HashSet;
import java.util.Set;

class Solution {
    public int lengthOfLongestSubstring(String s) {
        // window 保存当前窗口里的字符，保证窗口内没有重复字符
        Set<Character> window = new HashSet<>();

        // left 表示窗口左边界
        int left = 0;

        // 记录最长无重复子串长度
        int ans = 0;

        // right 表示窗口右边界
        for (int right = 0; right < s.length(); right++) {
            char c = s.charAt(right);

            // 如果 c 已经在窗口里，说明重复了
            // 不断移动 left，直到窗口里没有 c
            while (window.contains(c)) {
                window.remove(s.charAt(left));
                left++;
            }

            // 把当前字符加入窗口
            window.add(c);

            // 更新最大窗口长度
            ans = Math.max(ans, right - left + 1);
        }

        return ans;
    }
}`
  },
  {
    slug: "find-all-anagrams-in-a-string",
    title: "找到字符串中所有字母异位词",
    english: "Find All Anagrams in a String",
    difficulty: "Medium",
    group: "滑动窗口",
    topic: "滑动窗口",
    method: "固定长度窗口",
    goal: "找出 s 中所有 p 的异位词起始下标",
    complexity: "时间 O(n)，空间 O(1)",
    description: "给定只含小写英文字母的字符串 s 和 p，找出 s 中所有 p 的字母异位词的起始下标。",
    example: "输入：s = \"cbaebabacd\", p = \"abc\"\n输出：[0, 6]",
    thought: "用长度等于 p.length 的滑动窗口扫 s，用计数数组维护窗口内字符数量；如果窗口计数和 p 的计数相同，就找到一个异位词。",
    explanation: [
      "异位词不要求顺序一样，只要求每个字符出现次数一样。",
      "所以先统计 p 中每个字母出现几次，存到 need 数组。",
      "再用一个固定长度窗口扫 s：右边进一个字符，窗口太长时左边出一个字符。",
      "当窗口长度等于 p.length，并且 window 和 need 两个计数数组完全一样时，窗口起点就是答案。"
    ],
    code: `import java.util.*;

class Solution {
    public List<Integer> findAnagrams(String s, String p) {
        // ans 保存所有异位词子串的起始下标
        List<Integer> ans = new ArrayList<>();

        // s 比 p 还短，肯定找不到
        if (s.length() < p.length()) {
            return ans;
        }

        // need 记录 p 中每个字母需要出现几次
        int[] need = new int[26];

        // window 记录当前窗口中每个字母出现几次
        int[] window = new int[26];

        for (char c : p.toCharArray()) {
            need[c - 'a']++;
        }

        for (int right = 0; right < s.length(); right++) {
            // 右边界字符进入窗口
            window[s.charAt(right) - 'a']++;

            // 保持窗口长度不超过 p 的长度
            if (right >= p.length()) {
                // 超出长度后，最左边字符移出窗口
                window[s.charAt(right - p.length()) - 'a']--;
            }

            // 窗口长度够了，再判断字符数量是否和 p 完全一样
            if (right >= p.length() - 1 && Arrays.equals(need, window)) {
                ans.add(right - p.length() + 1);
            }
        }

        return ans;
    }
}`
  },
  {
    slug: "subarray-sum-equals-k",
    title: "和为 K 的子数组",
    english: "Subarray Sum Equals K",
    difficulty: "Medium",
    group: "前缀和",
    topic: "前缀和 + 哈希",
    method: "前缀和 + HashMap",
    goal: "统计和等于 k 的连续子数组数量",
    complexity: "时间 O(n)，空间 O(n)",
    description: "给一个整数数组和整数 k，统计和为 k 的连续子数组个数；数组里可以有负数。",
    example: "输入：nums = [1, 1, 1], k = 2\n输出：2",
    thought: "用前缀和表示从开头到当前位置的总和，用 HashMap 记录前面出现过的前缀和次数；如果之前有 sum - k，说明中间这段子数组和就是 k。",
    explanation: [
      "前缀和 sum 表示从数组开头加到当前位置的总和。",
      "如果某一段子数组和等于 k，就说明：当前前缀和 - 之前某个前缀和 = k。",
      "所以之前那个前缀和应该是 sum - k。",
      "map 记录每种前缀和出现过几次，出现几次就能形成几段和为 k 的子数组。",
      "因为数组可以有负数，窗口和不会稳定变大或变小，所以普通滑动窗口不适合这题。"
    ],
    code: `import java.util.HashMap;
import java.util.Map;

class Solution {
    public int subarraySum(int[] nums, int k) {
        // key 是前缀和，value 是这个前缀和出现次数
        Map<Integer, Integer> map = new HashMap<>();

        // 前缀和为 0 先出现 1 次
        // 这样从数组开头到当前位置刚好等于 k 时，也能被统计到
        map.put(0, 1);

        // sum 表示从开头到当前位置的前缀和
        int sum = 0;

        // ans 统计和为 k 的连续子数组个数
        int ans = 0;

        for (int num : nums) {
            // 更新当前前缀和
            sum += num;

            // 如果之前出现过 sum - k
            // 说明从那个位置之后到当前位置这一段的和为 k
            ans += map.getOrDefault(sum - k, 0);

            // 当前前缀和出现次数加 1，留给后面的数字使用
            map.put(sum, map.getOrDefault(sum, 0) + 1);
        }

        return ans;
    }
}`
  },
  {
    slug: "sliding-window-maximum",
    title: "滑动窗口最大值",
    english: "Sliding Window Maximum",
    difficulty: "Hard",
    group: "单调队列",
    topic: "单调队列",
    method: "单调双端队列",
    goal: "返回每个长度为 k 的窗口中的最大值",
    complexity: "时间 O(n)，空间 O(k)",
    description: "给一个数组 nums 和窗口大小 k，窗口每次向右移动一格，返回每个窗口中的最大值。",
    example: "输入：nums = [1,3,-1,-3,5,3,6,7], k = 3\n输出：[3,3,5,5,6,7]",
    thought: "用双端队列维护候选最大值：队头踢掉已经滑出窗口的元素，队尾踢掉比新元素小的元素；处理完后队头就是当前窗口最大值。",
    explanation: [
      "普通队列保存所有窗口元素，但找最大值还是慢。",
      "单调队列只保存“还有机会成为最大值”的元素下标。",
      "队头负责窗口范围：如果队头下标已经滑出当前窗口，就从队头删掉。",
      "队尾负责保持单调性：新元素进来时，把队尾所有比它小的元素删掉。",
      "如果新来的数比队尾更大，队尾那些更小的数以后不可能成为最大值，可以直接移掉。",
      "所以这题可以记成：队头踢过期，队尾踢更小，队头永远是最大值。"
    ],
    code: `import java.util.ArrayDeque;
import java.util.Deque;

class Solution {
    public int[] maxSlidingWindow(int[] nums, int k) {
        // 一共有 nums.length - k + 1 个窗口
        int[] ans = new int[nums.length - k + 1];

        // deque 保存下标，不直接保存值
        // 并保证这些下标对应的值从大到小
        Deque<Integer> deque = new ArrayDeque<>();

        for (int i = 0; i < nums.length; i++) {
            // 1. 队头：踢掉已经滑出窗口的元素
            // 当前窗口范围是 [i - k + 1, i]
            // 如果队头下标 <= i - k，说明它已经在窗口左边外面了
            while (!deque.isEmpty() && deque.peekFirst() <= i - k) {
                deque.pollFirst();
            }

            // 2. 队尾：踢掉比新元素小的元素
            // 因为 nums[i] 更靠右、又更大
            // 队尾那些更小的旧元素以后不可能成为最大值
            while (!deque.isEmpty() && nums[deque.peekLast()] <= nums[i]) {
                deque.pollLast();
            }

            // 3. 当前下标入队
            deque.offerLast(i);

            // 4. 从第一个完整窗口开始记录答案
            // 队头下标对应的值就是当前窗口最大值
            if (i >= k - 1) {
                ans[i - k + 1] = nums[deque.peekFirst()];
            }
        }

        return ans;
    }
}`
  },
  {
    slug: "minimum-window-substring",
    title: "最小覆盖子串",
    english: "Minimum Window Substring",
    difficulty: "Hard",
    group: "子串",
    topic: "滑动窗口",
    method: "滑动窗口 + 计数",
    goal: "找出 s 中覆盖 t 所有字符的最短子串",
    complexity: "时间 O(n)，空间 O(1)",
    description: "给两个字符串 s 和 t，返回 s 中覆盖 t 所有字符及出现次数的最短子串。",
    example: "输入：s = \"ADOBECODEBANC\", t = \"ABC\"\n输出：\"BANC\"",
    thought: "用 HashMap 统计 t 的字符次数；右指针扩张到每种字符次数都满足，再左指针收缩并记录最短窗口。",
    explanation: [
      "need 记录 t 中每个字符需要几次，所以 t = \"AABC\" 时窗口必须有两个 A。",
      "window 记录当前窗口拥有的字符次数。",
      "valid 表示已经满足需求次数的字符种类数；只有 valid == need.size() 才算覆盖完整。",
      "覆盖完整后再移动 left，尽量缩短窗口。"
    ],
    code: `import java.util.HashMap;
import java.util.Map;

class Solution {
    public String minWindow(String s, String t) {
        // need 记录 t 中每个字符需要出现几次
        Map<Character, Integer> need = new HashMap<>();

        // window 记录当前窗口中这些字符出现几次
        Map<Character, Integer> window = new HashMap<>();

        for (char c : t.toCharArray()) {
            need.put(c, need.getOrDefault(c, 0) + 1);
        }

        int left = 0;

        // valid 表示有多少种字符已经达到 need 要求的次数
        int valid = 0;
        int start = 0;
        int minLen = Integer.MAX_VALUE;

        for (int right = 0; right < s.length(); right++) {
            char c = s.charAt(right);
            if (need.containsKey(c)) {
                window.put(c, window.getOrDefault(c, 0) + 1);
                if (window.get(c).equals(need.get(c))) {
                    valid++;
                }
            }

            // valid == need.size() 说明窗口已经按次数覆盖了 t
            while (valid == need.size()) {
                if (right - left + 1 < minLen) {
                    start = left;
                    minLen = right - left + 1;
                }

                char d = s.charAt(left);
                left++;

                if (need.containsKey(d)) {
                    if (window.get(d).equals(need.get(d))) {
                        valid--;
                    }
                    window.put(d, window.get(d) - 1);
                }
            }
        }

        return minLen == Integer.MAX_VALUE ? "" : s.substring(start, start + minLen);
    }
}`
  },
  {
    slug: "maximum-subarray",
    title: "最大子数组和",
    english: "Maximum Subarray",
    difficulty: "Medium",
    group: "普通数组",
    topic: "动态规划",
    method: "Kadane 算法",
    goal: "找出和最大的连续子数组",
    complexity: "时间 O(n)，空间 O(1)",
    description: "给一个整数数组，返回连续子数组的最大和。",
    example: "输入：nums = [-2,1,-3,4,-1,2,1,-5,4]\n输出：6\n解释：[4,-1,2,1] 的和最大",
    thought: "遍历到每个数时，要么接在前面的子数组后面，要么从自己重新开始。",
    explanation: ["cur 表示以当前位置结尾的最大子数组和。", "如果前面的 cur 是负数，继续接只会变差。", "ans 记录所有 cur 中最大的一个。"],
    code: `class Solution {
    public int maxSubArray(int[] nums) {
        int cur = nums[0];
        int ans = nums[0];

        for (int i = 1; i < nums.length; i++) {
            // 要么接上前面的子数组，要么从当前数重新开始
            cur = Math.max(nums[i], cur + nums[i]);
            ans = Math.max(ans, cur);
        }

        return ans;
    }
}`
  },
  {
    slug: "merge-intervals",
    title: "合并区间",
    english: "Merge Intervals",
    difficulty: "Medium",
    group: "普通数组",
    topic: "排序",
    method: "按左端点排序",
    goal: "合并所有重叠区间",
    complexity: "时间 O(n log n)，空间 O(n)",
    description: "给若干区间，合并所有重叠区间并返回结果。",
    example: "输入：intervals = [[1,3],[2,6],[8,10],[15,18]]\n输出：[[1,6],[8,10],[15,18]]",
    thought: "先按区间左端点排序，再顺着合并能接上的区间。",
    explanation: ["排序后，只需要看当前区间能不能接到最后一个结果区间。", "能接上就扩展右端点。", "接不上就作为新区间加入答案。"],
    code: `import java.util.*;

class Solution {
    public int[][] merge(int[][] intervals) {
        // 按左端点排序
        Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));

        List<int[]> ans = new ArrayList<>();

        for (int[] interval : intervals) {
            // 答案为空，或者当前区间和最后一个区间不重叠
            if (ans.isEmpty() || ans.get(ans.size() - 1)[1] < interval[0]) {
                ans.add(interval);
            } else {
                // 有重叠，扩展最后一个区间右端点
                int[] last = ans.get(ans.size() - 1);
                last[1] = Math.max(last[1], interval[1]);
            }
        }

        return ans.toArray(new int[ans.size()][]);
    }
}`
  },
  {
    slug: "rotate-array",
    title: "轮转数组",
    english: "Rotate Array",
    difficulty: "Medium",
    group: "普通数组",
    topic: "数组反转",
    method: "三次反转",
    goal: "把数组向右轮转 k 位",
    complexity: "时间 O(n)，空间 O(1)",
    description: "给数组 nums 和整数 k，把数组元素向右轮转 k 位。",
    example: "输入：nums = [1,2,3,4,5,6,7], k = 3\n输出：[5,6,7,1,2,3,4]",
    thought: "先整体反转，再分别反转前 k 个和后 n-k 个，就能得到右轮转结果。",
    explanation: ["右轮转后，最后 k 个数会跑到前面。", "整体反转先把它们放到前面，但内部顺序反了。", "再分别反转两段，把内部顺序调回来。"],
    code: `class Solution {
    public void rotate(int[] nums, int k) {
        int n = nums.length;
        k %= n;

        // 整体反转
        reverse(nums, 0, n - 1);
        // 反转前 k 个
        reverse(nums, 0, k - 1);
        // 反转剩下的
        reverse(nums, k, n - 1);
    }

    private void reverse(int[] nums, int left, int right) {
        while (left < right) {
            int temp = nums[left];
            nums[left] = nums[right];
            nums[right] = temp;
            left++;
            right--;
        }
    }
}`
  },
  {
    slug: "product-of-array-except-self",
    title: "除自身以外数组的乘积",
    english: "Product of Array Except Self",
    difficulty: "Medium",
    group: "普通数组",
    topic: "前缀积",
    method: "左右乘积",
    goal: "返回每个位置除自身外其他数的乘积",
    complexity: "时间 O(n)，空间 O(1)，不算返回数组",
    description: "给一个数组，不使用除法，返回 answer，其中 answer[i] 等于 nums 中除 nums[i] 以外所有元素的乘积。",
    example: "输入：nums = [1,2,3,4]\n输出：[24,12,8,6]",
    thought: "答案等于左边所有数的乘积乘以右边所有数的乘积，先存左乘积，再从右边补上右乘积。",
    explanation: ["不能用除法时，就拆成左侧乘积和右侧乘积。", "第一遍让 ans[i] 存 i 左边的乘积。", "第二遍从右往左，用 right 乘上右边的乘积。"],
    code: `class Solution {
    public int[] productExceptSelf(int[] nums) {
        int n = nums.length;
        int[] ans = new int[n];

        // ans[i] 先保存 i 左边所有数的乘积
        ans[0] = 1;
        for (int i = 1; i < n; i++) {
            ans[i] = ans[i - 1] * nums[i - 1];
        }

        // right 表示 i 右边所有数的乘积
        int right = 1;
        for (int i = n - 1; i >= 0; i--) {
            ans[i] *= right;
            right *= nums[i];
        }

        return ans;
    }
}`
  },
  {
    slug: "first-missing-positive",
    title: "缺失的第一个正数",
    english: "First Missing Positive",
    difficulty: "Hard",
    group: "普通数组",
    topic: "原地哈希",
    method: "把数字放回自己的位置",
    goal: "找到数组中缺失的最小正整数",
    complexity: "时间 O(n)，空间 O(1)",
    description: "给一个未排序数组，找出没有出现的最小正整数。",
    example: "输入：nums = [3,4,-1,1]\n输出：2",
    thought: "把数字 x 尽量放到下标 x - 1 的位置，最后第一个位置不对的下标就是答案。",
    explanation: ["长度为 n 的数组，答案只可能在 1 到 n+1 之间。", "如果 nums[i] 是 1..n，就尝试把它换到 nums[i]-1。", "整理完后，第一个 nums[i] != i+1 的位置就是缺失值。"],
    code: `class Solution {
    public int firstMissingPositive(int[] nums) {
        int n = nums.length;

        for (int i = 0; i < n; i++) {
            // nums[i] 应该放到 nums[i] - 1 的位置
            while (nums[i] >= 1 && nums[i] <= n && nums[nums[i] - 1] != nums[i]) {
                int target = nums[i] - 1;
                int temp = nums[i];
                nums[i] = nums[target];
                nums[target] = temp;
            }
        }

        for (int i = 0; i < n; i++) {
            if (nums[i] != i + 1) {
                return i + 1;
            }
        }

        return n + 1;
    }
}`
  },
  {
    slug: "set-matrix-zeroes",
    title: "矩阵置零",
    english: "Set Matrix Zeroes",
    difficulty: "Medium",
    group: "矩阵",
    topic: "矩阵标记",
    method: "第一行第一列做标记",
    goal: "把含 0 元素所在的整行整列都置为 0",
    complexity: "时间 O(mn)，空间 O(1)",
    description: "如果矩阵某个元素为 0，就把它所在的整行和整列都设为 0。",
    example: "输入：matrix = [[1,1,1],[1,0,1],[1,1,1]]\n输出：[[1,0,1],[0,0,0],[1,0,1]]",
    thought: "用第一行和第一列记录哪些行列需要置零，最后再统一处理。",
    explanation: ["额外数组可以记录行列，但空间不是 O(1)。", "第一行和第一列本身可以当标记区。", "需要单独记录第一行、第一列原本是否有 0。"],
    code: `class Solution {
    public void setZeroes(int[][] matrix) {
        int m = matrix.length;
        int n = matrix[0].length;
        boolean firstRowZero = false;
        boolean firstColZero = false;

        // 判断第一列是否需要置零
        for (int i = 0; i < m; i++) {
            if (matrix[i][0] == 0) {
                firstColZero = true;
            }
        }

        // 判断第一行是否需要置零
        for (int j = 0; j < n; j++) {
            if (matrix[0][j] == 0) {
                firstRowZero = true;
            }
        }

        // 用第一行和第一列做标记
        for (int i = 1; i < m; i++) {
            for (int j = 1; j < n; j++) {
                if (matrix[i][j] == 0) {
                    matrix[i][0] = 0;
                    matrix[0][j] = 0;
                }
            }
        }

        // 根据标记置零
        for (int i = 1; i < m; i++) {
            for (int j = 1; j < n; j++) {
                if (matrix[i][0] == 0 || matrix[0][j] == 0) {
                    matrix[i][j] = 0;
                }
            }
        }

        if (firstRowZero) {
            for (int j = 0; j < n; j++) {
                matrix[0][j] = 0;
            }
        }

        if (firstColZero) {
            for (int i = 0; i < m; i++) {
                matrix[i][0] = 0;
            }
        }
    }
}`
  },
  {
    slug: "spiral-matrix",
    title: "螺旋矩阵",
    english: "Spiral Matrix",
    difficulty: "Medium",
    group: "矩阵",
    topic: "模拟",
    method: "四个边界",
    goal: "按螺旋顺序返回矩阵元素",
    complexity: "时间 O(mn)，空间 O(1)，不算返回结果",
    description: "给一个矩阵，按照顺时针螺旋顺序返回所有元素。",
    example: "输入：matrix = [[1,2,3],[4,5,6],[7,8,9]]\n输出：[1,2,3,6,9,8,7,4,5]",
    thought: "维护上、下、左、右四个边界，每走完一条边就把对应边界往里收。",
    explanation: ["先从左到右走上边。", "再从上到下走右边。", "然后从右到左走下边、从下到上走左边。", "每走完一圈，边界向内缩。"],
    code: `import java.util.*;

class Solution {
    public List<Integer> spiralOrder(int[][] matrix) {
        List<Integer> ans = new ArrayList<>();
        int top = 0;
        int bottom = matrix.length - 1;
        int left = 0;
        int right = matrix[0].length - 1;

        while (top <= bottom && left <= right) {
            // 上边：从左到右
            for (int j = left; j <= right; j++) {
                ans.add(matrix[top][j]);
            }
            top++;

            // 右边：从上到下
            for (int i = top; i <= bottom; i++) {
                ans.add(matrix[i][right]);
            }
            right--;

            // 下边：从右到左
            if (top <= bottom) {
                for (int j = right; j >= left; j--) {
                    ans.add(matrix[bottom][j]);
                }
                bottom--;
            }

            // 左边：从下到上
            if (left <= right) {
                for (int i = bottom; i >= top; i--) {
                    ans.add(matrix[i][left]);
                }
                left++;
            }
        }

        return ans;
    }
}`
  },
  {
    slug: "rotate-image",
    title: "旋转图像",
    english: "Rotate Image",
    difficulty: "Medium",
    group: "矩阵",
    topic: "矩阵变换",
    method: "转置 + 反转每行",
    goal: "原地顺时针旋转矩阵 90 度",
    complexity: "时间 O(n²)，空间 O(1)",
    description: "给一个 n x n 矩阵，原地将图像顺时针旋转 90 度。",
    example: "输入：matrix = [[1,2,3],[4,5,6],[7,8,9]]\n输出：[[7,4,1],[8,5,2],[9,6,3]]",
    thought: "先沿主对角线转置矩阵，再反转每一行，就等于顺时针旋转 90 度。",
    explanation: ["转置会把行列互换。", "顺时针旋转还需要把每行左右翻转。", "两个步骤都能原地完成。"],
    code: `class Solution {
    public void rotate(int[][] matrix) {
        int n = matrix.length;

        // 沿主对角线转置
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                int temp = matrix[i][j];
                matrix[i][j] = matrix[j][i];
                matrix[j][i] = temp;
            }
        }

        // 反转每一行
        for (int i = 0; i < n; i++) {
            int left = 0;
            int right = n - 1;
            while (left < right) {
                int temp = matrix[i][left];
                matrix[i][left] = matrix[i][right];
                matrix[i][right] = temp;
                left++;
                right--;
            }
        }
    }
}`
  },
  {
    slug: "search-a-2d-matrix-ii",
    title: "搜索二维矩阵 II",
    english: "Search a 2D Matrix II",
    difficulty: "Medium",
    group: "矩阵",
    topic: "矩阵搜索",
    method: "从右上角走",
    goal: "判断目标值是否在行列递增矩阵中",
    complexity: "时间 O(m+n)，空间 O(1)",
    description: "给一个非空矩阵，每行、每列都升序，判断 target 是否存在。",
    example: "输入：matrix = [[1,4,7],[2,5,8],[3,6,9]], target = 5\n输出：true",
    thought: "从右上角开始，比 target 大就左移，比 target 小就下移。",
    explanation: ["右上角左边都更小，下边都更大。", "当前值太大，排除当前列。", "当前值太小，排除当前行。"],
    code: `class Solution {
    public boolean searchMatrix(int[][] matrix, int target) {
        int row = 0;
        int col = matrix[0].length - 1;

        while (row < matrix.length && col >= 0) {
            if (matrix[row][col] == target) {
                return true;
            } else if (matrix[row][col] > target) {
                // 当前值太大，只能往左找更小的
                col--;
            } else {
                // 当前值太小，只能往下找更大的
                row++;
            }
        }

        return false;
    }
}`
  },
  {
    slug: "intersection-of-two-linked-lists",
    title: "相交链表",
    english: "Intersection of Two Linked Lists",
    difficulty: "Easy",
    group: "链表",
    topic: "双指针",
    method: "双指针换头",
    goal: "找到两个链表开始相交的节点",
    complexity: "时间 O(m+n)，空间 O(1)",
    description: "给两个单链表头节点，返回它们开始相交的节点；相交指共享同一个节点对象，不是节点值相同。",
    example: "输入：intersectVal = 8, listA = [4,1,8,4,5], listB = [5,6,1,8,4,5], skipA = 2, skipB = 3\n输出：值为 8 的同一个节点对象",
    thought: "两个指针分别走 A+B 和 B+A，如果有交点，它们会在交点相遇；没有交点就一起到 null。",
    explanation: ["两个链表长度可能不同。", "让两个指针走完自己的链表后切到对方链表。", "这样两个指针走过的总长度相同。", "判断条件是 pA == pB，也就是两个指针指向同一个节点对象。"],
    code: `public class Solution {
    public ListNode getIntersectionNode(ListNode headA, ListNode headB) {
        ListNode pA = headA;
        ListNode pB = headB;

        while (pA != pB) {
            // A 走完后去走 B
            pA = pA == null ? headB : pA.next;
            // B 走完后去走 A
            pB = pB == null ? headA : pB.next;
        }

        return pA;
    }
}`
  },
  {
    slug: "reverse-linked-list",
    title: "反转链表",
    english: "Reverse Linked List",
    difficulty: "Easy",
    group: "链表",
    topic: "链表指针",
    method: "迭代反转",
    goal: "反转单链表",
    complexity: "时间 O(n)，空间 O(1)",
    description: "给单链表头节点，返回反转后的链表头节点。",
    example: "输入：head = [1,2,3,4,5]\n输出：[5,4,3,2,1]",
    thought: "用 prev 记录已经反转好的前半段，用 cur 一边遍历一边把 next 指针反过来。",
    explanation: ["先保存 cur.next，避免链表断掉后找不到后面。", "把 cur.next 指向 prev。", "prev 和 cur 一起向后移动。"],
    code: `class Solution {
    public ListNode reverseList(ListNode head) {
        ListNode prev = null;
        ListNode cur = head;

        while (cur != null) {
            // 先保存后面的节点
            ListNode next = cur.next;

            // 当前节点指向前一个节点，完成反转
            cur.next = prev;

            // 两个指针一起后移
            prev = cur;
            cur = next;
        }

        return prev;
    }
}`
  },
  {
    slug: "palindrome-linked-list",
    title: "回文链表",
    english: "Palindrome Linked List",
    difficulty: "Easy",
    group: "链表",
    topic: "快慢指针",
    method: "找中点 + 反转后半段",
    goal: "判断链表是否是回文",
    complexity: "时间 O(n)，空间 O(1)",
    description: "给一个单链表，判断它是否从前往后和从后往前读都一样。",
    example: "输入：head = [1,2,2,1]\n输出：true",
    thought: "快慢指针找到中点，反转后半段，再从两头同步比较。",
    explanation: ["慢指针到中点时，后半段可以单独反转；奇数长度时 slow 正好停在中间节点。", "反转后，链表尾部变成可从前往后比较的链。", "逐个比较前半段和反转后的后半段。", "这份写法会改变原链表结构；如果题目要求保持原样，比较后需要再反转回来。"],
    code: `class Solution {
    public boolean isPalindrome(ListNode head) {
        if (head == null || head.next == null) {
            return true;
        }

        // 快慢指针找中点
        ListNode slow = head;
        ListNode fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }

        // 反转后半段
        ListNode second = reverse(slow);
        ListNode first = head;

        // 比较前半段和反转后的后半段
        while (second != null) {
            if (first.val != second.val) {
                return false;
            }
            first = first.next;
            second = second.next;
        }

        return true;
    }

    private ListNode reverse(ListNode head) {
        ListNode prev = null;
        ListNode cur = head;
        while (cur != null) {
            ListNode next = cur.next;
            cur.next = prev;
            prev = cur;
            cur = next;
        }
        return prev;
    }
}`
  },
  {
    slug: "linked-list-cycle",
    title: "环形链表",
    english: "Linked List Cycle",
    difficulty: "Easy",
    group: "链表",
    topic: "快慢指针",
    method: "Floyd 判环",
    goal: "判断链表中是否有环",
    complexity: "时间 O(n)，空间 O(1)",
    description: "给一个链表头节点，判断链表中是否存在环。",
    example: "输入：head = [3,2,0,-4], tail connects to index 1\n输出：true",
    thought: "快指针一次走两步，慢指针一次走一步；如果有环，快指针一定会追上慢指针。",
    explanation: ["无环时，快指针会先走到 null。", "有环时，快慢指针都会进入环。", "快指针相对慢指针每次靠近一步，最终相遇。"],
    code: `public class Solution {
    public boolean hasCycle(ListNode head) {
        ListNode slow = head;
        ListNode fast = head;

        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;

            // 快慢指针相遇，说明有环
            if (slow == fast) {
                return true;
            }
        }

        return false;
    }
}`
  },
  {
    slug: "linked-list-cycle-ii",
    title: "环形链表 II",
    english: "Linked List Cycle II",
    difficulty: "Medium",
    group: "链表",
    topic: "快慢指针",
    method: "Floyd 找入口",
    goal: "找到链表环的入口节点",
    complexity: "时间 O(n)，空间 O(1)",
    description: "给一个链表头节点，如果链表有环，返回环的入口节点；否则返回 null。",
    example: "输入：head = [3,2,0,-4], tail connects to index 1\n输出：值为 2 的节点",
    thought: "快慢指针先在环内相遇，再让一个指针回到头节点，两者同步走，相遇点就是环入口。",
    explanation: ["第一步只判断是否有环并找到相遇点。", "第二步一个指针从头开始，一个从相遇点开始。", "它们每次走一步，会在环入口相遇。"],
    code: `public class Solution {
    public ListNode detectCycle(ListNode head) {
        ListNode slow = head;
        ListNode fast = head;

        // 先找快慢指针相遇点
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;

            if (slow == fast) {
                // 一个从头出发，一个从相遇点出发
                ListNode p = head;
                while (p != slow) {
                    p = p.next;
                    slow = slow.next;
                }
                return p;
            }
        }

        return null;
    }
}`
  },
  {
    slug: "merge-two-sorted-lists",
    title: "合并两个有序链表",
    english: "Merge Two Sorted Lists",
    difficulty: "Easy",
    group: "链表",
    topic: "链表合并",
    method: "虚拟头节点",
    goal: "合并两个升序链表",
    complexity: "时间 O(m+n)，空间 O(1)",
    description: "给两个升序链表，合并成一个新的升序链表。",
    example: "输入：list1 = [1,2,4], list2 = [1,3,4]\n输出：[1,1,2,3,4,4]",
    thought: "用 dummy 做新链表的虚拟头，每次把较小的节点接到结果链表后面。",
    explanation: ["dummy 可以避免单独处理头节点。", "p 指向结果链表尾部。", "谁小就接谁，最后接上剩余链表。"],
    code: `class Solution {
    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
        ListNode dummy = new ListNode(0);
        ListNode cur = dummy;

        while (list1 != null && list2 != null) {
            if (list1.val <= list2.val) {
                cur.next = list1;
                list1 = list1.next;
            } else {
                cur.next = list2;
                list2 = list2.next;
            }
            cur = cur.next;
        }

        // 剩下的链表直接接上
        cur.next = list1 != null ? list1 : list2;
        return dummy.next;
    }
}`
  },
  {
    slug: "add-two-numbers",
    title: "两数相加",
    english: "Add Two Numbers",
    difficulty: "Medium",
    group: "链表",
    topic: "链表模拟",
    method: "逐位相加",
    goal: "把两个逆序链表表示的数字相加",
    complexity: "时间 O(max(m,n))，空间 O(max(m,n))",
    description: "两个链表按逆序存储数字，每个节点存一位，返回它们的和对应的链表。",
    example: "输入：l1 = [2,4,3], l2 = [5,6,4]\n输出：[7,0,8]\n解释：342 + 465 = 807",
    thought: "像手算加法一样，从低位到高位逐位相加，并维护进位 carry。",
    explanation: ["两个链表本来就是低位在前，所以可以直接顺序遍历。", "每一位求 sum = v1 + v2 + carry。", "新节点是 sum % 10，进位是 sum / 10。"],
    code: `class Solution {
    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        ListNode dummy = new ListNode(0);
        ListNode cur = dummy;
        int carry = 0;

        while (l1 != null || l2 != null || carry != 0) {
            int sum = carry;

            if (l1 != null) {
                sum += l1.val;
                l1 = l1.next;
            }
            if (l2 != null) {
                sum += l2.val;
                l2 = l2.next;
            }

            // 当前位
            cur.next = new ListNode(sum % 10);
            // 下一位进位
            carry = sum / 10;
            cur = cur.next;
        }

        return dummy.next;
    }
}`
  },
  {
    slug: "remove-nth-node-from-end-of-list",
    title: "删除链表的倒数第 N 个结点",
    english: "Remove Nth Node From End of List",
    difficulty: "Medium",
    group: "链表",
    topic: "快慢指针",
    method: "快慢指针 + dummy",
    goal: "删除倒数第 n 个节点",
    complexity: "时间 O(n)，空间 O(1)",
    description: "给链表头节点和 n，删除链表倒数第 n 个节点并返回头节点。",
    example: "输入：head = [1,2,3,4,5], n = 2\n输出：[1,2,3,5]",
    thought: "让 fast 先走 n 步，再让 fast 和 slow 一起走，fast 到末尾时 slow 正好在待删节点前面。",
    explanation: ["dummy 能处理删除头节点的情况。", "fast 先制造 n 个节点的距离。", "最后 slow.next 就是要删除的节点。"],
    code: `class Solution {
    public ListNode removeNthFromEnd(ListNode head, int n) {
        ListNode dummy = new ListNode(0);
        dummy.next = head;

        ListNode fast = dummy;
        ListNode slow = dummy;

        // fast 先走 n 步
        for (int i = 0; i < n; i++) {
            fast = fast.next;
        }

        // fast 到最后一个节点时，slow 在待删除节点前面
        while (fast.next != null) {
            fast = fast.next;
            slow = slow.next;
        }

        slow.next = slow.next.next;
        return dummy.next;
    }
}`
  },
  {
    slug: "swap-nodes-in-pairs",
    title: "两两交换链表中的节点",
    english: "Swap Nodes in Pairs",
    difficulty: "Medium",
    group: "链表",
    topic: "链表指针",
    method: "dummy + 三指针",
    goal: "每两个相邻节点交换一次",
    complexity: "时间 O(n)，空间 O(1)",
    description: "给链表头节点，两两交换其中相邻的节点，并返回交换后的链表。",
    example: "输入：head = [1,2,3,4]\n输出：[2,1,4,3]",
    thought: "用 prev 指向每一组两个节点前面的位置，然后局部调整 first 和 second 的指向。",
    explanation: ["每次处理 prev 后面的两个节点。", "先保存 first 和 second。", "把 second 提到 first 前面，再把 prev 移到这一组尾部。"],
    code: `class Solution {
    public ListNode swapPairs(ListNode head) {
        ListNode dummy = new ListNode(0);
        dummy.next = head;
        ListNode prev = dummy;

        while (prev.next != null && prev.next.next != null) {
            ListNode first = prev.next;
            ListNode second = first.next;

            // 把 second 放到 first 前面
            first.next = second.next;
            second.next = first;
            prev.next = second;

            // prev 移到这一组的尾部
            prev = first;
        }

        return dummy.next;
    }
}`
  },
  {
    slug: "reverse-nodes-in-k-group",
    title: "K 个一组翻转链表",
    english: "Reverse Nodes in k-Group",
    difficulty: "Hard",
    group: "链表",
    topic: "链表反转",
    method: "分组反转",
    goal: "每 k 个节点一组进行翻转",
    complexity: "时间 O(n)，空间 O(1)",
    description: "给链表头节点和 k，每 k 个节点一组翻转；不足 k 个节点保持原样。",
    example: "输入：head = [1,2,3,4,5], k = 2\n输出：[2,1,4,3,5]",
    thought: "先确认后面够 k 个节点，再把这一小段原地反转，并接回链表。",
    explanation: ["groupPrev 指向当前组前一个节点。", "先找到当前组的第 k 个节点。", "反转这一组，再把前后链表接好。"],
    code: `class Solution {
    public ListNode reverseKGroup(ListNode head, int k) {
        ListNode dummy = new ListNode(0);
        dummy.next = head;
        ListNode groupPrev = dummy;

        while (true) {
            ListNode kth = getKth(groupPrev, k);
            if (kth == null) {
                break;
            }

            ListNode groupNext = kth.next;

            // 反转当前组
            ListNode prev = groupNext;
            ListNode cur = groupPrev.next;
            while (cur != groupNext) {
                ListNode next = cur.next;
                cur.next = prev;
                prev = cur;
                cur = next;
            }

            // 接回链表
            ListNode oldHead = groupPrev.next;
            groupPrev.next = kth;
            groupPrev = oldHead;
        }

        return dummy.next;
    }

    private ListNode getKth(ListNode cur, int k) {
        while (cur != null && k > 0) {
            cur = cur.next;
            k--;
        }
        return cur;
    }
}`
  },
  {
    slug: "copy-list-with-random-pointer",
    title: "随机链表的复制",
    english: "Copy List with Random Pointer",
    difficulty: "Medium",
    group: "链表",
    topic: "哈希表",
    method: "HashMap 映射新旧节点",
    goal: "深拷贝带 random 指针的链表",
    complexity: "时间 O(n)，空间 O(n)",
    description: "链表节点除了 next，还有 random 指针，要求复制一份完全独立的新链表。",
    example: "输入：head = [[7,null],[13,0],[11,4],[10,2],[1,0]]\n输出：深拷贝后的同结构链表",
    thought: "先为每个旧节点创建新节点并存进 map，再第二遍补上 next 和 random 指针。",
    explanation: ["random 可能指向任意节点，直接复制会找不到对应新节点。", "map 记录旧节点到新节点的映射。", "第二遍用 map 连接新节点的 next 和 random。"],
    code: `import java.util.HashMap;
import java.util.Map;

class Solution {
    public Node copyRandomList(Node head) {
        if (head == null) {
            return null;
        }

        Map<Node, Node> map = new HashMap<>();
        Node cur = head;

        // 第一遍：创建所有新节点
        while (cur != null) {
            map.put(cur, new Node(cur.val));
            cur = cur.next;
        }

        cur = head;
        // 第二遍：补 next 和 random 指针
        while (cur != null) {
            Node copy = map.get(cur);
            copy.next = map.get(cur.next);
            copy.random = map.get(cur.random);
            cur = cur.next;
        }

        return map.get(head);
    }
}`
  },
  {
    slug: "sort-list",
    title: "排序链表",
    english: "Sort List",
    difficulty: "Medium",
    group: "链表",
    topic: "归并排序",
    method: "快慢指针拆分 + 归并",
    goal: "把链表升序排序",
    complexity: "时间 O(n log n)，空间 O(log n)",
    description: "给链表头节点，按升序排列并返回排序后的链表。",
    example: "输入：head = [4,2,1,3]\n输出：[1,2,3,4]",
    thought: "用快慢指针把链表拆成两半，分别排序后再合并两个有序链表。",
    explanation: ["链表不适合随机访问，归并排序更自然。", "快慢指针可以找到中点并断开链表。", "递归排序左右两段，最后合并。"],
    code: `class Solution {
    public ListNode sortList(ListNode head) {
        if (head == null || head.next == null) {
            return head;
        }

        // 快慢指针找中点前一个节点
        ListNode slow = head;
        ListNode fast = head.next;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }

        ListNode mid = slow.next;
        slow.next = null;

        ListNode left = sortList(head);
        ListNode right = sortList(mid);
        return merge(left, right);
    }

    private ListNode merge(ListNode a, ListNode b) {
        ListNode dummy = new ListNode(0);
        ListNode cur = dummy;

        while (a != null && b != null) {
            if (a.val <= b.val) {
                cur.next = a;
                a = a.next;
            } else {
                cur.next = b;
                b = b.next;
            }
            cur = cur.next;
        }

        cur.next = a != null ? a : b;
        return dummy.next;
    }
}`
  },
  {
    slug: "merge-k-sorted-lists",
    title: "合并 K 个升序链表",
    english: "Merge k Sorted Lists",
    difficulty: "Hard",
    group: "链表",
    topic: "堆",
    method: "小根堆",
    goal: "把 k 个升序链表合并成一个升序链表",
    complexity: "时间 O(n log k)，空间 O(k)",
    description: "给 k 个升序链表，合并成一个升序链表并返回。",
    example: "输入：lists = [[1,4,5],[1,3,4],[2,6]]\n输出：[1,1,2,3,4,4,5,6]",
    thought: "把每个链表的头节点放进小根堆，每次取最小节点接到结果后面，再把它的 next 放进堆。",
    explanation: ["k 个链表当前最小值只可能出现在 k 个头节点里。", "小根堆能快速拿到最小头节点。", "取出一个节点后，把它的下一个节点补进堆。"],
    code: `import java.util.PriorityQueue;

class Solution {
    public ListNode mergeKLists(ListNode[] lists) {
        PriorityQueue<ListNode> pq = new PriorityQueue<>((a, b) -> Integer.compare(a.val, b.val));

        // 每个链表的头节点入堆
        for (ListNode node : lists) {
            if (node != null) {
                pq.offer(node);
            }
        }

        ListNode dummy = new ListNode(0);
        ListNode cur = dummy;

        while (!pq.isEmpty()) {
            ListNode node = pq.poll();
            cur.next = node;
            cur = cur.next;

            // 当前节点后面还有节点，继续入堆
            if (node.next != null) {
                pq.offer(node.next);
            }
        }

        return dummy.next;
    }
}`
  },
  {
    slug: "lru-cache",
    title: "LRU 缓存",
    english: "LRU Cache",
    difficulty: "Medium",
    group: "链表",
    topic: "HashMap + 双向链表",
    method: "LinkedHashMap 简洁实现",
    goal: "实现最近最少使用缓存",
    complexity: "get/put 时间 O(1)，空间 O(capacity)",
    description: "设计一个 LRU 缓存，支持 O(1) 的 get 和 put；容量满时删除最久未使用的元素。",
    example: "输入：LRUCache cache = new LRUCache(2); put(1,1); put(2,2); get(1); put(3,3); get(2)\n输出：1, -1",
    thought: "LRU 的通用结构是 HashMap + 双向链表；Java 的 LinkedHashMap 已经封装好这套结构，可以用它写简洁版。",
    explanation: ["面试里常见手写版是 HashMap 定位节点，双向链表维护新旧顺序。", "LinkedHashMap 的 accessOrder=true 会让被访问的元素移动到末尾。", "末尾是最近使用，头部是最久未使用。", "容量超过时，让 LinkedHashMap 自动删除头部。"],
    code: `import java.util.LinkedHashMap;
import java.util.Map;

class LRUCache extends LinkedHashMap<Integer, Integer> {
    private int capacity;

    public LRUCache(int capacity) {
        // true 表示按访问顺序排列
        super(capacity, 0.75f, true);
        this.capacity = capacity;
    }

    public int get(int key) {
        return super.getOrDefault(key, -1);
    }

    public void put(int key, int value) {
        super.put(key, value);
    }

    @Override
    protected boolean removeEldestEntry(Map.Entry<Integer, Integer> eldest) {
        // 超过容量时，自动删除最久未使用的元素
        return size() > capacity;
    }
}`
  },
  {
    slug: "binary-tree-inorder-traversal",
    title: "二叉树的中序遍历",
    english: "Binary Tree Inorder Traversal",
    difficulty: "Easy",
    group: "二叉树",
    topic: "DFS",
    method: "递归",
    goal: "返回二叉树中序遍历结果",
    complexity: "时间 O(n)，空间 O(h)",
    description: "给二叉树根节点，返回它的中序遍历结果。",
    example: "输入：root = [1,null,2,3]\n输出：[1,3,2]",
    thought: "中序遍历的顺序是：左子树、当前节点、右子树。",
    explanation: ["递归先处理左边。", "再把当前节点加入答案。", "最后处理右边。"],
    code: `import java.util.*;

class Solution {
    public List<Integer> inorderTraversal(TreeNode root) {
        List<Integer> ans = new ArrayList<>();
        dfs(root, ans);
        return ans;
    }

    private void dfs(TreeNode node, List<Integer> ans) {
        if (node == null) {
            return;
        }

        dfs(node.left, ans);
        ans.add(node.val);
        dfs(node.right, ans);
    }
}`
  },
  {
    slug: "maximum-depth-of-binary-tree",
    title: "二叉树的最大深度",
    english: "Maximum Depth of Binary Tree",
    difficulty: "Easy",
    group: "二叉树",
    topic: "DFS",
    method: "递归",
    goal: "求根节点到最远叶子节点的节点数",
    complexity: "时间 O(n)，空间 O(h)",
    description: "给二叉树根节点，返回它的最大深度。",
    example: "输入：root = [3,9,20,null,null,15,7]\n输出：3",
    thought: "一棵树的最大深度 = 左右子树最大深度的较大值 + 1。",
    explanation: ["空树深度是 0。", "递归求左子树深度和右子树深度。", "当前节点贡献 1 层。"],
    code: `class Solution {
    public int maxDepth(TreeNode root) {
        if (root == null) {
            return 0;
        }

        int left = maxDepth(root.left);
        int right = maxDepth(root.right);
        return Math.max(left, right) + 1;
    }
}`
  },
  {
    slug: "invert-binary-tree",
    title: "翻转二叉树",
    english: "Invert Binary Tree",
    difficulty: "Easy",
    group: "二叉树",
    topic: "递归",
    method: "左右子树交换",
    goal: "把二叉树左右镜像翻转",
    complexity: "时间 O(n)，空间 O(h)",
    description: "给二叉树根节点，翻转这棵树并返回根节点。",
    example: "输入：root = [4,2,7,1,3,6,9]\n输出：[4,7,2,9,6,3,1]",
    thought: "对每个节点交换左右孩子，再递归翻转左右子树。",
    explanation: ["翻转整棵树，其实就是每个节点都交换左右孩子。", "交换后继续处理左右子树。", "空节点直接返回。"],
    code: `class Solution {
    public TreeNode invertTree(TreeNode root) {
        if (root == null) {
            return null;
        }

        // 交换左右孩子
        TreeNode temp = root.left;
        root.left = root.right;
        root.right = temp;

        invertTree(root.left);
        invertTree(root.right);
        return root;
    }
}`
  },
  {
    slug: "symmetric-tree",
    title: "对称二叉树",
    english: "Symmetric Tree",
    difficulty: "Easy",
    group: "二叉树",
    topic: "递归",
    method: "镜像比较",
    goal: "判断二叉树是否轴对称",
    complexity: "时间 O(n)，空间 O(h)",
    description: "给二叉树根节点，判断它是否关于中心轴对称。",
    example: "输入：root = [1,2,2,3,4,4,3]\n输出：true",
    thought: "比较两棵子树是否互为镜像：外侧对外侧，内侧对内侧。",
    explanation: ["左子树和右子树不是普通相等，而是镜像相等。", "左.left 要和右.right 比。", "左.right 要和右.left 比。"],
    code: `class Solution {
    public boolean isSymmetric(TreeNode root) {
        return root == null || isMirror(root.left, root.right);
    }

    private boolean isMirror(TreeNode left, TreeNode right) {
        if (left == null || right == null) {
            return left == right;
        }

        if (left.val != right.val) {
            return false;
        }

        // 外侧和外侧比，内侧和内侧比
        return isMirror(left.left, right.right) && isMirror(left.right, right.left);
    }
}`
  },
  {
    slug: "diameter-of-binary-tree",
    title: "二叉树的直径",
    english: "Diameter of Binary Tree",
    difficulty: "Easy",
    group: "二叉树",
    topic: "树形 DP",
    method: "DFS 求高度",
    goal: "求任意两个节点之间最长路径的边数",
    complexity: "时间 O(n)，空间 O(h)",
    description: "给二叉树根节点，返回这棵树的直径，也就是任意两个节点之间最长路径的边数。",
    example: "输入：root = [1,2,3,4,5]\n输出：3",
    thought: "每个节点的最长路径 = 左子树高度 + 右子树高度，DFS 求高度时顺手更新答案。",
    explanation: ["最长路径可能经过某个节点，也可能完全在某个子树中。", "经过当前节点的路径长度是 leftHeight + rightHeight。", "递归返回当前子树高度。"],
    code: `class Solution {
    private int ans = 0;

    public int diameterOfBinaryTree(TreeNode root) {
        depth(root);
        return ans;
    }

    private int depth(TreeNode node) {
        if (node == null) {
            return 0;
        }

        int left = depth(node.left);
        int right = depth(node.right);

        // 经过当前节点的最长路径边数
        ans = Math.max(ans, left + right);

        // 当前子树高度
        return Math.max(left, right) + 1;
    }
}`
  },
  {
    slug: "binary-tree-level-order-traversal",
    title: "二叉树的层序遍历",
    english: "Binary Tree Level Order Traversal",
    difficulty: "Medium",
    group: "二叉树",
    topic: "BFS",
    method: "队列",
    goal: "按层返回二叉树节点值",
    complexity: "时间 O(n)，空间 O(n)",
    description: "给二叉树根节点，返回它按层遍历的节点值。",
    example: "输入：root = [3,9,20,null,null,15,7]\n输出：[[3],[9,20],[15,7]]",
    thought: "用队列做 BFS，每次先记录当前层大小，再取出这一层所有节点。",
    explanation: ["队列先进先出，天然适合按层遍历。", "每一轮开始时，队列大小就是当前层节点数。", "处理节点时把它的孩子加入队列。"],
    code: `import java.util.*;

class Solution {
    public List<List<Integer>> levelOrder(TreeNode root) {
        List<List<Integer>> ans = new ArrayList<>();
        if (root == null) {
            return ans;
        }

        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);

        while (!queue.isEmpty()) {
            int size = queue.size();
            List<Integer> level = new ArrayList<>();

            // 只处理当前层的节点
            for (int i = 0; i < size; i++) {
                TreeNode node = queue.poll();
                level.add(node.val);

                if (node.left != null) {
                    queue.offer(node.left);
                }
                if (node.right != null) {
                    queue.offer(node.right);
                }
            }

            ans.add(level);
        }

        return ans;
    }
}`
  },
  {
    slug: "convert-sorted-array-to-binary-search-tree",
    title: "将有序数组转换为二叉搜索树",
    english: "Convert Sorted Array to Binary Search Tree",
    difficulty: "Easy",
    group: "二叉树",
    topic: "二分递归",
    method: "中点建树",
    goal: "把升序数组转换为高度平衡 BST",
    complexity: "时间 O(n)，空间 O(log n)",
    description: "给一个升序数组，把它转换成一棵高度平衡的二叉搜索树。",
    example: "输入：nums = [-10,-3,0,5,9]\n输出：一种可行 BST 是 [0,-3,9,-10,null,5]",
    thought: "每次选数组中点作为根，左半边建左子树，右半边建右子树。",
    explanation: ["升序数组中点作为根，可以让左右数量尽量接近。", "左半部分都小于根，适合作左子树。", "右半部分都大于根，适合作右子树。"],
    code: `class Solution {
    public TreeNode sortedArrayToBST(int[] nums) {
        return build(nums, 0, nums.length - 1);
    }

    private TreeNode build(int[] nums, int left, int right) {
        if (left > right) {
            return null;
        }

        int mid = left + (right - left) / 2;
        TreeNode root = new TreeNode(nums[mid]);

        root.left = build(nums, left, mid - 1);
        root.right = build(nums, mid + 1, right);
        return root;
    }
}`
  },
  {
    slug: "validate-binary-search-tree",
    title: "验证二叉搜索树",
    english: "Validate Binary Search Tree",
    difficulty: "Medium",
    group: "二叉树",
    topic: "BST",
    method: "上下界递归",
    goal: "判断一棵树是否是合法 BST",
    complexity: "时间 O(n)，空间 O(h)",
    description: "给二叉树根节点，判断它是否是有效的二叉搜索树。",
    example: "输入：root = [2,1,3]\n输出：true",
    thought: "递归时给每个节点一个合法范围，左子树必须小于根，右子树必须大于根。",
    explanation: ["不能只比较父子节点，还要满足祖先限制。", "左子树范围上界变成当前节点值。", "右子树范围下界变成当前节点值。"],
    code: `class Solution {
    public boolean isValidBST(TreeNode root) {
        return check(root, Long.MIN_VALUE, Long.MAX_VALUE);
    }

    private boolean check(TreeNode node, long low, long high) {
        if (node == null) {
            return true;
        }

        // 当前值必须在合法范围内
        if (node.val <= low || node.val >= high) {
            return false;
        }

        return check(node.left, low, node.val) && check(node.right, node.val, high);
    }
}`
  },
  {
    slug: "kth-smallest-element-in-a-bst",
    title: "二叉搜索树中第 K 小的元素",
    english: "Kth Smallest Element in a BST",
    difficulty: "Medium",
    group: "二叉树",
    topic: "BST",
    method: "中序遍历",
    goal: "找到 BST 中第 k 小的值",
    complexity: "时间 O(h+k)，空间 O(h)",
    description: "给二叉搜索树根节点和 k，返回树中第 k 小的节点值。",
    example: "输入：root = [3,1,4,null,2], k = 1\n输出：1",
    thought: "BST 的中序遍历是升序，第 k 次访问到的节点就是答案。",
    explanation: ["中序遍历顺序：左、根、右。", "在 BST 中，这个顺序刚好是从小到大。", "访问节点时递减 k，k 为 0 就找到答案。"],
    code: `class Solution {
    private int k;
    private int ans;

    public int kthSmallest(TreeNode root, int k) {
        this.k = k;
        inorder(root);
        return ans;
    }

    private void inorder(TreeNode node) {
        if (node == null || k == 0) {
            return;
        }

        inorder(node.left);

        // 当前节点是升序中的一个数
        k--;
        if (k == 0) {
            ans = node.val;
            return;
        }

        inorder(node.right);
    }
}`
  },
  {
    slug: "binary-tree-right-side-view",
    title: "二叉树的右视图",
    english: "Binary Tree Right Side View",
    difficulty: "Medium",
    group: "二叉树",
    topic: "BFS",
    method: "层序遍历",
    goal: "返回从右侧能看到的节点值",
    complexity: "时间 O(n)，空间 O(n)",
    description: "给二叉树根节点，返回从右侧看这棵树时能看到的节点值。",
    example: "输入：root = [1,2,3,null,5,null,4]\n输出：[1,3,4]",
    thought: "层序遍历时，每一层最后访问到的节点就是右视图节点。",
    explanation: ["右视图每层只有一个节点。", "BFS 可以清楚分层。", "每层遍历到最后一个节点时加入答案。"],
    code: `import java.util.*;

class Solution {
    public List<Integer> rightSideView(TreeNode root) {
        List<Integer> ans = new ArrayList<>();
        if (root == null) {
            return ans;
        }

        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);

        while (!queue.isEmpty()) {
            int size = queue.size();

            for (int i = 0; i < size; i++) {
                TreeNode node = queue.poll();

                // 当前层最后一个节点
                if (i == size - 1) {
                    ans.add(node.val);
                }

                if (node.left != null) {
                    queue.offer(node.left);
                }
                if (node.right != null) {
                    queue.offer(node.right);
                }
            }
        }

        return ans;
    }
}`
  },
  {
    slug: "flatten-binary-tree-to-linked-list",
    title: "二叉树展开为链表",
    english: "Flatten Binary Tree to Linked List",
    difficulty: "Medium",
    group: "二叉树",
    topic: "递归",
    method: "反向前序 + prev",
    goal: "原地把二叉树展开成前序链表",
    complexity: "时间 O(n)，空间 O(h)",
    description: "给二叉树根节点，原地展开成单链表，展开顺序为前序遍历。",
    example: "输入：root = [1,2,5,3,4,null,6]\n输出：[1,null,2,null,3,null,4,null,5,null,6]",
    thought: "反向前序遍历：右、左、根，用 prev 记录已经展开好的链表头。",
    explanation: ["正常前序是根、左、右。", "反过来处理右、左、根时，可以让当前节点直接指向 prev。", "每处理完一个节点，就把 prev 更新成当前节点。"],
    code: `class Solution {
    private TreeNode prev = null;

    public void flatten(TreeNode root) {
        if (root == null) {
            return;
        }

        // 反向前序：右、左、根
        flatten(root.right);
        flatten(root.left);

        // 当前节点接到已经展开好的链表前面
        root.right = prev;
        root.left = null;
        prev = root;
    }
}`
  },
  {
    slug: "construct-binary-tree-from-preorder-and-inorder-traversal",
    title: "从前序与中序遍历序列构造二叉树",
    english: "Construct Binary Tree from Preorder and Inorder Traversal",
    difficulty: "Medium",
    group: "二叉树",
    topic: "递归建树",
    method: "前序定根 + 中序分左右",
    goal: "根据前序和中序遍历还原二叉树",
    complexity: "时间 O(n)，空间 O(n)",
    description: "给二叉树的前序遍历和中序遍历，构造并返回这棵二叉树；节点值互不相同。",
    example: "输入：preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]\n输出：[3,9,20,null,null,15,7]",
    thought: "前序第一个数是根；在中序里找到根，左边就是左子树，右边就是右子树。",
    explanation: ["前序帮助确定根节点。", "中序帮助划分左右子树范围。", "因为节点值互不相同，才能用 map 记录值到中序下标的映射。"],
    code: `import java.util.HashMap;
import java.util.Map;

class Solution {
    private int preIndex = 0;
    private Map<Integer, Integer> indexMap = new HashMap<>();

    public TreeNode buildTree(int[] preorder, int[] inorder) {
        for (int i = 0; i < inorder.length; i++) {
            indexMap.put(inorder[i], i);
        }
        return build(preorder, 0, inorder.length - 1);
    }

    private TreeNode build(int[] preorder, int left, int right) {
        if (left > right) {
            return null;
        }

        // 前序当前值就是根节点
        int rootVal = preorder[preIndex++];
        TreeNode root = new TreeNode(rootVal);

        int mid = indexMap.get(rootVal);
        root.left = build(preorder, left, mid - 1);
        root.right = build(preorder, mid + 1, right);
        return root;
    }
}`
  },
  {
    slug: "path-sum-iii",
    title: "路径总和 III",
    english: "Path Sum III",
    difficulty: "Medium",
    group: "二叉树",
    topic: "前缀和",
    method: "DFS + 前缀和",
    goal: "统计路径和等于 targetSum 的路径数量",
    complexity: "时间 O(n)，空间 O(n)",
    description: "给二叉树和目标和，统计路径和等于目标值的路径数量；路径可以从任意节点开始、任意节点结束，但必须向下走。",
    example: "输入：root = [10,5,-3,3,2,null,11,3,-2,null,1], targetSum = 8\n输出：3",
    thought: "树上也能用前缀和：当前前缀和为 sum，如果当前路径上之前有 sum - target，就能形成一条向下合法路径。",
    explanation: ["DFS 过程中记录从根到当前节点的前缀和。", "map 存的是当前递归路径上的前缀和次数，所以路径不必从根开始。", "回溯离开节点时，要把当前前缀和次数减回去，避免影响其他分支。"],
    code: `import java.util.HashMap;
import java.util.Map;

class Solution {
    private Map<Long, Integer> map = new HashMap<>();
    private int ans = 0;

    public int pathSum(TreeNode root, int targetSum) {
        map.put(0L, 1);
        dfs(root, 0L, targetSum);
        return ans;
    }

    private void dfs(TreeNode node, long sum, int target) {
        if (node == null) {
            return;
        }

        sum += node.val;

        // 如果前面出现过 sum - target，中间这段路径和就是 target
        ans += map.getOrDefault(sum - target, 0);
        map.put(sum, map.getOrDefault(sum, 0) + 1);

        dfs(node.left, sum, target);
        dfs(node.right, sum, target);

        // 回溯，离开当前节点
        map.put(sum, map.get(sum) - 1);
    }
}`
  },
  {
    slug: "lowest-common-ancestor-of-a-binary-tree",
    title: "二叉树的最近公共祖先",
    english: "Lowest Common Ancestor of a Binary Tree",
    difficulty: "Medium",
    group: "二叉树",
    topic: "递归",
    method: "左右子树查找",
    goal: "找到两个节点的最近公共祖先",
    complexity: "时间 O(n)，空间 O(h)",
    description: "给二叉树根节点和两个节点 p、q，返回它们的最近公共祖先。",
    example: "输入：root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1\n输出：3",
    thought: "递归在左右子树里找 p 和 q；如果左右都找到了，当前节点就是最近公共祖先。",
    explanation: ["如果当前节点是 null、p、q，直接返回当前节点。", "分别去左右子树找。", "左右都有结果说明 p、q 分居两侧，当前节点就是答案。"],
    code: `class Solution {
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        if (root == null || root == p || root == q) {
            return root;
        }

        TreeNode left = lowestCommonAncestor(root.left, p, q);
        TreeNode right = lowestCommonAncestor(root.right, p, q);

        if (left != null && right != null) {
            return root;
        }

        return left != null ? left : right;
    }
}`
  },
  {
    slug: "binary-tree-maximum-path-sum",
    title: "二叉树中的最大路径和",
    english: "Binary Tree Maximum Path Sum",
    difficulty: "Hard",
    group: "二叉树",
    topic: "树形 DP",
    method: "DFS 求最大贡献",
    goal: "求任意路径的最大节点值之和",
    complexity: "时间 O(n)，空间 O(h)",
    description: "给二叉树根节点，返回任意非空路径的最大路径和。",
    example: "输入：root = [-10,9,20,null,null,15,7]\n输出：42",
    thought: "每个节点向父节点只能贡献一条边，但更新答案时可以同时接左贡献和右贡献。",
    explanation: ["负贡献不要接，因为会让路径变小。", "经过当前节点的最大路径是 left + node.val + right。", "返回给父节点时只能选择左或右其中一边。"],
    code: `class Solution {
    private int ans = Integer.MIN_VALUE;

    public int maxPathSum(TreeNode root) {
        gain(root);
        return ans;
    }

    private int gain(TreeNode node) {
        if (node == null) {
            return 0;
        }

        // 负数贡献直接丢掉
        int left = Math.max(0, gain(node.left));
        int right = Math.max(0, gain(node.right));

        // 路径可以经过当前节点并同时连接左右
        ans = Math.max(ans, left + node.val + right);

        // 返回给父节点时，只能选择一条向下路径
        return node.val + Math.max(left, right);
    }
}`
  },
  {
    slug: "number-of-islands",
    title: "岛屿数量",
    english: "Number of Islands",
    difficulty: "Medium",
    group: "图论",
    topic: "DFS",
    method: "网格 DFS",
    goal: "统计网格中岛屿数量",
    complexity: "时间 O(mn)，空间 O(mn)",
    description: "给由 1 和 0 组成的网格，统计被水包围的岛屿数量。",
    example: "输入：grid = [[\"1\",\"1\",\"0\"],[\"1\",\"0\",\"0\"],[\"0\",\"0\",\"1\"]]\n输出：2",
    thought: "遇到一个没访问过的陆地，就从它开始 DFS 把整座岛淹掉，答案加 1。",
    explanation: ["岛屿是上下左右连接的一片 1。", "DFS 可以把同一座岛的所有 1 都标记掉。", "之后再遇到 1，说明发现了新岛。"],
    code: `class Solution {
    public int numIslands(char[][] grid) {
        int ans = 0;

        for (int i = 0; i < grid.length; i++) {
            for (int j = 0; j < grid[0].length; j++) {
                if (grid[i][j] == '1') {
                    ans++;
                    dfs(grid, i, j);
                }
            }
        }

        return ans;
    }

    private void dfs(char[][] grid, int i, int j) {
        if (i < 0 || i >= grid.length || j < 0 || j >= grid[0].length || grid[i][j] != '1') {
            return;
        }

        // 标记为水，避免重复访问
        grid[i][j] = '0';
        dfs(grid, i + 1, j);
        dfs(grid, i - 1, j);
        dfs(grid, i, j + 1);
        dfs(grid, i, j - 1);
    }
}`
  },
  {
    slug: "rotting-oranges",
    title: "腐烂的橘子",
    english: "Rotting Oranges",
    difficulty: "Medium",
    group: "图论",
    topic: "BFS",
    method: "多源 BFS",
    goal: "求所有新鲜橘子腐烂所需最短时间",
    complexity: "时间 O(mn)，空间 O(mn)",
    description: "网格里 2 是腐烂橘子，1 是新鲜橘子；每分钟腐烂橘子会感染相邻新鲜橘子，求全部腐烂所需时间。",
    example: "输入：grid = [[2,1,1],[1,1,0],[0,1,1]]\n输出：4",
    thought: "把所有腐烂橘子同时入队做多源 BFS，一层代表一分钟。",
    explanation: ["所有初始腐烂橘子是同一时间点的感染源。", "BFS 每扩散一层，时间加 1。", "最后如果还有新鲜橘子，返回 -1。"],
    code: `import java.util.*;

class Solution {
    public int orangesRotting(int[][] grid) {
        int m = grid.length;
        int n = grid[0].length;
        Queue<int[]> queue = new LinkedList<>();
        int fresh = 0;

        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (grid[i][j] == 2) {
                    queue.offer(new int[]{i, j});
                } else if (grid[i][j] == 1) {
                    fresh++;
                }
            }
        }

        int minutes = 0;
        int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};

        while (!queue.isEmpty() && fresh > 0) {
            int size = queue.size();
            minutes++;

            for (int s = 0; s < size; s++) {
                int[] cur = queue.poll();

                for (int[] d : dirs) {
                    int x = cur[0] + d[0];
                    int y = cur[1] + d[1];

                    if (x >= 0 && x < m && y >= 0 && y < n && grid[x][y] == 1) {
                        grid[x][y] = 2;
                        fresh--;
                        queue.offer(new int[]{x, y});
                    }
                }
            }
        }

        return fresh == 0 ? minutes : -1;
    }
}`
  },
  {
    slug: "course-schedule",
    title: "课程表",
    english: "Course Schedule",
    difficulty: "Medium",
    group: "图论",
    topic: "拓扑排序",
    method: "入度 + 队列",
    goal: "判断是否能完成所有课程",
    complexity: "时间 O(n+m)，空间 O(n+m)",
    description: "给课程数量和先修关系，判断能否学完所有课程；prerequisites[i] = [course, pre] 表示学 course 前必须先学 pre。",
    example: "输入：numCourses = 2, prerequisites = [[1,0]]\n输出：true",
    thought: "把先修关系看成有向图，持续学习入度为 0 的课；如果最后学完全部课程，说明没有环。",
    explanation: ["[course, pre] 要建边 pre -> course，这个方向最容易写反。", "入度表示一门课还有多少先修课没学。", "入度为 0 的课可以先学。", "如果有环，环里的课永远不会变成入度 0。"],
    code: `import java.util.*;

class Solution {
    public boolean canFinish(int numCourses, int[][] prerequisites) {
        List<List<Integer>> graph = new ArrayList<>();
        for (int i = 0; i < numCourses; i++) {
            graph.add(new ArrayList<>());
        }

        int[] indegree = new int[numCourses];

        for (int[] p : prerequisites) {
            int course = p[0];
            int pre = p[1];
            // [course, pre] 表示 pre -> course
            graph.get(pre).add(course);
            indegree[course]++;
        }

        Queue<Integer> queue = new LinkedList<>();
        for (int i = 0; i < numCourses; i++) {
            if (indegree[i] == 0) {
                queue.offer(i);
            }
        }

        int learned = 0;
        while (!queue.isEmpty()) {
            int cur = queue.poll();
            learned++;

            for (int next : graph.get(cur)) {
                indegree[next]--;
                if (indegree[next] == 0) {
                    queue.offer(next);
                }
            }
        }

        return learned == numCourses;
    }
}`
  },
  {
    slug: "implement-trie-prefix-tree",
    title: "实现 Trie 前缀树",
    english: "Implement Trie (Prefix Tree)",
    difficulty: "Medium",
    group: "图论",
    topic: "字典树",
    method: "Trie 节点",
    goal: "实现插入、查找单词、查找前缀",
    complexity: "每次操作时间 O(k)，空间 O(总字符数)",
    description: "设计前缀树，支持插入单词、搜索单词、判断是否存在某前缀；这里按小写英文字母 a-z 实现。",
    example: "输入：insert(\"apple\"), search(\"apple\"), startsWith(\"app\")\n输出：true, true",
    thought: "每个 Trie 节点保存 26 个孩子和一个 isEnd 标记，沿字符路径向下走。",
    explanation: ["插入时，没有对应孩子就创建。", "搜索单词时，路径存在且最后节点 isEnd 为 true。", "搜索前缀时，只需要路径存在。"],
    code: `class Trie {
    private Trie[] children;
    private boolean isEnd;

    public Trie() {
        children = new Trie[26];
    }

    public void insert(String word) {
        Trie node = this;
        for (char c : word.toCharArray()) {
            int index = c - 'a';
            if (node.children[index] == null) {
                node.children[index] = new Trie();
            }
            node = node.children[index];
        }
        node.isEnd = true;
    }

    public boolean search(String word) {
        Trie node = find(word);
        return node != null && node.isEnd;
    }

    public boolean startsWith(String prefix) {
        return find(prefix) != null;
    }

    private Trie find(String s) {
        Trie node = this;
        for (char c : s.toCharArray()) {
            int index = c - 'a';
            if (node.children[index] == null) {
                return null;
            }
            node = node.children[index];
        }
        return node;
    }
}`
  },
  {
    slug: "permutations",
    title: "全排列",
    english: "Permutations",
    difficulty: "Medium",
    group: "回溯",
    topic: "回溯",
    method: "路径 + used 数组",
    goal: "返回数组中所有可能排列",
    complexity: "时间 O(n * n!)，空间 O(n)",
    description: "给不含重复数字的数组，返回所有可能的全排列。",
    example: "输入：nums = [1,2,3]\n输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]",
    thought: "每一层选择一个还没用过的数加入路径，路径长度等于 n 时就是一个排列。",
    explanation: ["used 记录哪些数已经在当前路径里。", "选择一个数后递归下一层。", "递归回来要撤销选择，尝试其他数。"],
    code: `import java.util.*;

class Solution {
    public List<List<Integer>> permute(int[] nums) {
        List<List<Integer>> ans = new ArrayList<>();
        boolean[] used = new boolean[nums.length];
        backtrack(nums, used, new ArrayList<>(), ans);
        return ans;
    }

    private void backtrack(int[] nums, boolean[] used, List<Integer> path, List<List<Integer>> ans) {
        if (path.size() == nums.length) {
            ans.add(new ArrayList<>(path));
            return;
        }

        for (int i = 0; i < nums.length; i++) {
            if (used[i]) {
                continue;
            }

            used[i] = true;
            path.add(nums[i]);

            backtrack(nums, used, path, ans);

            // 撤销选择
            path.remove(path.size() - 1);
            used[i] = false;
        }
    }
}`
  },
  {
    slug: "subsets",
    title: "子集",
    english: "Subsets",
    difficulty: "Medium",
    group: "回溯",
    topic: "回溯",
    method: "选或不选",
    goal: "返回数组所有子集",
    complexity: "时间 O(n * 2^n)，空间 O(n)",
    description: "给一组不含重复元素的整数数组，返回所有可能的子集。",
    example: "输入：nums = [1,2,3]\n输出：[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]",
    thought: "每到一个位置，都可以选择加入或不加入；也可以用 start 控制下一次从哪里继续选。",
    explanation: ["当前路径本身就是一个子集，所以每层都先加入答案。", "从 start 往后选择，避免重复。", "递归回来撤销选择。"],
    code: `import java.util.*;

class Solution {
    public List<List<Integer>> subsets(int[] nums) {
        List<List<Integer>> ans = new ArrayList<>();
        backtrack(nums, 0, new ArrayList<>(), ans);
        return ans;
    }

    private void backtrack(int[] nums, int start, List<Integer> path, List<List<Integer>> ans) {
        // 当前路径就是一个子集
        ans.add(new ArrayList<>(path));

        for (int i = start; i < nums.length; i++) {
            path.add(nums[i]);
            backtrack(nums, i + 1, path, ans);
            path.remove(path.size() - 1);
        }
    }
}`
  },
  {
    slug: "letter-combinations-of-a-phone-number",
    title: "电话号码的字母组合",
    english: "Letter Combinations of a Phone Number",
    difficulty: "Medium",
    group: "回溯",
    topic: "回溯",
    method: "逐位选择",
    goal: "返回数字字符串能表示的所有字母组合",
    complexity: "时间 O(4^n)，空间 O(n)",
    description: "给包含 2-9 的字符串，返回它能表示的所有字母组合。",
    example: "输入：digits = \"23\"\n输出：[\"ad\",\"ae\",\"af\",\"bd\",\"be\",\"bf\",\"cd\",\"ce\",\"cf\"]",
    thought: "每个数字对应几个字母，递归时每一层为当前数字选择一个字母。",
    explanation: ["index 表示处理到第几个数字。", "从映射表中拿到当前数字对应的字母。", "依次加入路径并递归下一位。"],
    code: `import java.util.*;

class Solution {
    private String[] map = {
        "", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"
    };

    public List<String> letterCombinations(String digits) {
        List<String> ans = new ArrayList<>();
        if (digits.length() == 0) {
            return ans;
        }

        backtrack(digits, 0, new StringBuilder(), ans);
        return ans;
    }

    private void backtrack(String digits, int index, StringBuilder path, List<String> ans) {
        if (index == digits.length()) {
            ans.add(path.toString());
            return;
        }

        String letters = map[digits.charAt(index) - '0'];
        for (char c : letters.toCharArray()) {
            path.append(c);
            backtrack(digits, index + 1, path, ans);
            path.deleteCharAt(path.length() - 1);
        }
    }
}`
  },
  {
    slug: "combination-sum",
    title: "组合总和",
    english: "Combination Sum",
    difficulty: "Medium",
    group: "回溯",
    topic: "回溯",
    method: "可重复选择",
    goal: "找出和为 target 的所有组合",
    complexity: "时间与答案规模相关，空间 O(target)",
    description: "给无重复正整数候选数组和目标值，返回所有和等于目标值的组合；数字可以重复使用。",
    example: "输入：candidates = [2,3,6,7], target = 7\n输出：[[2,2,3],[7]]",
    thought: "从 start 开始选择数字；因为数字可以重复使用，选中 candidates[i] 后下一层仍从 i 开始。",
    explanation: ["remain 表示还差多少。", "remain 为 0 时得到一组答案。", "start 防止同一组合以不同顺序重复出现。"],
    code: `import java.util.*;

class Solution {
    public List<List<Integer>> combinationSum(int[] candidates, int target) {
        List<List<Integer>> ans = new ArrayList<>();
        backtrack(candidates, target, 0, new ArrayList<>(), ans);
        return ans;
    }

    private void backtrack(int[] candidates, int remain, int start, List<Integer> path, List<List<Integer>> ans) {
        if (remain == 0) {
            ans.add(new ArrayList<>(path));
            return;
        }

        if (remain < 0) {
            return;
        }

        for (int i = start; i < candidates.length; i++) {
            path.add(candidates[i]);
            // 可以重复使用当前数字，所以还是从 i 开始
            backtrack(candidates, remain - candidates[i], i, path, ans);
            path.remove(path.size() - 1);
        }
    }
}`
  },
  {
    slug: "generate-parentheses",
    title: "括号生成",
    english: "Generate Parentheses",
    difficulty: "Medium",
    group: "回溯",
    topic: "回溯",
    method: "合法括号约束",
    goal: "生成 n 对括号的所有合法组合",
    complexity: "时间与答案规模相关，空间 O(n)",
    description: "给 n，生成所有由 n 对括号组成的合法括号组合。",
    example: "输入：n = 3\n输出：[\"((()))\",\"(()())\",\"(())()\",\"()(())\",\"()()()\"]",
    thought: "左括号数量没到 n 就可以放左括号；右括号数量小于左括号时才可以放右括号。",
    explanation: ["合法序列任何前缀中，右括号不能多于左括号。", "open 表示已经放了多少左括号。", "close 表示已经放了多少右括号。"],
    code: `import java.util.*;

class Solution {
    public List<String> generateParenthesis(int n) {
        List<String> ans = new ArrayList<>();
        backtrack(n, 0, 0, new StringBuilder(), ans);
        return ans;
    }

    private void backtrack(int n, int open, int close, StringBuilder path, List<String> ans) {
        if (path.length() == 2 * n) {
            ans.add(path.toString());
            return;
        }

        if (open < n) {
            path.append('(');
            backtrack(n, open + 1, close, path, ans);
            path.deleteCharAt(path.length() - 1);
        }

        if (close < open) {
            path.append(')');
            backtrack(n, open, close + 1, path, ans);
            path.deleteCharAt(path.length() - 1);
        }
    }
}`
  },
  {
    slug: "word-search",
    title: "单词搜索",
    english: "Word Search",
    difficulty: "Medium",
    group: "回溯",
    topic: "网格 DFS",
    method: "回溯搜索",
    goal: "判断单词是否能在网格中按相邻格子组成",
    complexity: "时间 O(mn * 4^L)，空间 O(L)",
    description: "给字符网格和单词，判断单词是否能由相邻格子的字母按顺序组成；同一格不能重复使用。",
    example: "输入：board = [[\"A\",\"B\",\"C\",\"E\"],[\"S\",\"F\",\"C\",\"S\"],[\"A\",\"D\",\"E\",\"E\"]], word = \"ABCCED\"\n输出：true",
    thought: "从每个可能起点开始 DFS，匹配一个字符就临时标记已访问，失败后恢复现场。",
    explanation: ["index 表示当前要匹配 word 的第几个字符。", "越界、字符不同都失败。", "标记当前格子，向四个方向继续搜索，回来后恢复。"],
    code: `class Solution {
    public boolean exist(char[][] board, String word) {
        for (int i = 0; i < board.length; i++) {
            for (int j = 0; j < board[0].length; j++) {
                if (dfs(board, word, i, j, 0)) {
                    return true;
                }
            }
        }
        return false;
    }

    private boolean dfs(char[][] board, String word, int i, int j, int index) {
        if (index == word.length()) {
            return true;
        }

        if (i < 0 || i >= board.length || j < 0 || j >= board[0].length) {
            return false;
        }

        if (board[i][j] != word.charAt(index)) {
            return false;
        }

        char temp = board[i][j];
        board[i][j] = '#';

        boolean found = dfs(board, word, i + 1, j, index + 1)
            || dfs(board, word, i - 1, j, index + 1)
            || dfs(board, word, i, j + 1, index + 1)
            || dfs(board, word, i, j - 1, index + 1);

        // 恢复现场
        board[i][j] = temp;
        return found;
    }
}`
  },
  {
    slug: "palindrome-partitioning",
    title: "分割回文串",
    english: "Palindrome Partitioning",
    difficulty: "Medium",
    group: "回溯",
    topic: "回溯",
    method: "枚举切割点",
    goal: "返回所有能把字符串切成回文串的方案",
    complexity: "时间 O(n * 2^n)，空间 O(n)",
    description: "给字符串 s，把它分割成若干子串，使每个子串都是回文串，返回所有方案。",
    example: "输入：s = \"aab\"\n输出：[[\"a\",\"a\",\"b\"],[\"aa\",\"b\"]]",
    thought: "从当前位置开始枚举每个结束位置，只要当前片段是回文，就切一刀继续递归。",
    explanation: ["start 表示下一段从哪里开始。", "枚举 start 到 end 的子串。", "如果是回文，就加入路径并处理后面剩余部分。"],
    code: `import java.util.*;

class Solution {
    public List<List<String>> partition(String s) {
        List<List<String>> ans = new ArrayList<>();
        backtrack(s, 0, new ArrayList<>(), ans);
        return ans;
    }

    private void backtrack(String s, int start, List<String> path, List<List<String>> ans) {
        if (start == s.length()) {
            ans.add(new ArrayList<>(path));
            return;
        }

        for (int end = start; end < s.length(); end++) {
            if (isPalindrome(s, start, end)) {
                path.add(s.substring(start, end + 1));
                backtrack(s, end + 1, path, ans);
                path.remove(path.size() - 1);
            }
        }
    }

    private boolean isPalindrome(String s, int left, int right) {
        while (left < right) {
            if (s.charAt(left++) != s.charAt(right--)) {
                return false;
            }
        }
        return true;
    }
}`
  },
  {
    slug: "n-queens",
    title: "N 皇后",
    english: "N-Queens",
    difficulty: "Hard",
    group: "回溯",
    topic: "回溯",
    method: "按行放皇后",
    goal: "返回所有合法 N 皇后棋盘",
    complexity: "时间 O(n!)，空间 O(n)",
    description: "在 n x n 棋盘上放 n 个皇后，使它们互不攻击，返回所有方案。",
    example: "输入：n = 4\n输出：两种合法棋盘方案",
    thought: "一行只放一个皇后，递归到每行时尝试所有列，并用列、两条对角线集合判断冲突。",
    explanation: ["同一列不能重复。", "主对角线可用 row - col 标识。", "副对角线可用 row + col 标识。"],
    code: `import java.util.*;

class Solution {
    public List<List<String>> solveNQueens(int n) {
        List<List<String>> ans = new ArrayList<>();
        char[][] board = new char[n][n];
        for (char[] row : board) {
            Arrays.fill(row, '.');
        }

        backtrack(0, n, board, new boolean[n], new boolean[2 * n], new boolean[2 * n], ans);
        return ans;
    }

    private void backtrack(int row, int n, char[][] board, boolean[] cols,
                           boolean[] diag1, boolean[] diag2, List<List<String>> ans) {
        if (row == n) {
            List<String> path = new ArrayList<>();
            for (char[] r : board) {
                path.add(new String(r));
            }
            ans.add(path);
            return;
        }

        for (int col = 0; col < n; col++) {
            int d1 = row - col + n;
            int d2 = row + col;
            if (cols[col] || diag1[d1] || diag2[d2]) {
                continue;
            }

            board[row][col] = 'Q';
            cols[col] = diag1[d1] = diag2[d2] = true;

            backtrack(row + 1, n, board, cols, diag1, diag2, ans);

            board[row][col] = '.';
            cols[col] = diag1[d1] = diag2[d2] = false;
        }
    }
}`
  },
  {
    slug: "search-insert-position",
    title: "搜索插入位置",
    english: "Search Insert Position",
    difficulty: "Easy",
    group: "二分查找",
    topic: "二分查找",
    method: "左边界二分",
    goal: "找到 target 的位置或插入位置",
    complexity: "时间 O(log n)，空间 O(1)",
    description: "给升序数组和目标值，返回目标值下标；不存在则返回应该插入的位置。",
    example: "输入：nums = [1,3,5,6], target = 5\n输出：2",
    thought: "找第一个大于等于 target 的位置，就是答案。",
    explanation: ["如果 target 存在，第一个大于等于它的位置就是它。", "如果不存在，这个位置就是插入点。", "二分时保留可能答案在 left。"],
    code: `class Solution {
    public int searchInsert(int[] nums, int target) {
        int left = 0;
        int right = nums.length;

        while (left < right) {
            int mid = left + (right - left) / 2;

            if (nums[mid] >= target) {
                right = mid;
            } else {
                left = mid + 1;
            }
        }

        return left;
    }
}`
  },
  {
    slug: "search-a-2d-matrix",
    title: "搜索二维矩阵",
    english: "Search a 2D Matrix",
    difficulty: "Medium",
    group: "二分查找",
    topic: "二分查找",
    method: "二维转一维",
    goal: "判断 target 是否存在于矩阵中",
    complexity: "时间 O(log mn)，空间 O(1)",
    description: "矩阵每行升序，且下一行第一个数大于上一行最后一个数，判断 target 是否存在。",
    example: "输入：matrix = [[1,3,5],[7,9,11]], target = 9\n输出：true",
    thought: "把 m x n 矩阵看成长度 m*n 的升序数组，再做普通二分。",
    explanation: ["一维下标 idx 对应 row = idx / n，col = idx % n。", "矩阵整体有序，能直接二分。", "比较中间值和 target。"],
    code: `class Solution {
    public boolean searchMatrix(int[][] matrix, int target) {
        int m = matrix.length;
        int n = matrix[0].length;
        int left = 0;
        int right = m * n - 1;

        while (left <= right) {
            int mid = left + (right - left) / 2;
            int value = matrix[mid / n][mid % n];

            if (value == target) {
                return true;
            } else if (value < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }

        return false;
    }
}`
  },
  {
    slug: "find-first-and-last-position-of-element-in-sorted-array",
    title: "在排序数组中查找元素的第一个和最后一个位置",
    english: "Find First and Last Position of Element in Sorted Array",
    difficulty: "Medium",
    group: "二分查找",
    topic: "二分边界",
    method: "lowerBound + upperBound",
    goal: "返回 target 的起始和结束位置",
    complexity: "时间 O(log n)，空间 O(1)",
    description: "给升序数组和 target，返回 target 第一次和最后一次出现的位置；不存在返回 [-1,-1]。",
    example: "输入：nums = [5,7,7,8,8,10], target = 8\n输出：[3,4]",
    thought: "lowerBound 找第一个 >= target 的位置，upperBound 找第一个 > target 的位置；右边界就是 upperBound - 1。",
    explanation: ["lowerBound(nums, target) 是第一个 target 的位置。", "upperBound(nums, target) - 1 是最后一个 target 的位置。", "不要用 target + 1 找右边界，target 是 Integer.MAX_VALUE 时会溢出。", "先判断左边界是否真的等于 target。"],
    code: `class Solution {
    public int[] searchRange(int[] nums, int target) {
        int left = lowerBound(nums, target);
        if (left == nums.length || nums[left] != target) {
            return new int[]{-1, -1};
        }

        int right = upperBound(nums, target) - 1;
        return new int[]{left, right};
    }

    private int lowerBound(int[] nums, int target) {
        int left = 0;
        int right = nums.length;

        while (left < right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] >= target) {
                right = mid;
            } else {
                left = mid + 1;
            }
        }

        return left;
    }

    private int upperBound(int[] nums, int target) {
        int left = 0;
        int right = nums.length;

        while (left < right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] > target) {
                right = mid;
            } else {
                left = mid + 1;
            }
        }

        return left;
    }
}`
  },
  {
    slug: "search-in-rotated-sorted-array",
    title: "搜索旋转排序数组",
    english: "Search in Rotated Sorted Array",
    difficulty: "Medium",
    group: "二分查找",
    topic: "旋转数组二分",
    method: "判断有序半边",
    goal: "在旋转升序数组中查找 target",
    complexity: "时间 O(log n)，空间 O(1)",
    description: "无重复元素的升序数组被旋转后，给定 target，返回它的下标；不存在返回 -1。",
    example: "输入：nums = [4,5,6,7,0,1,2], target = 0\n输出：4",
    thought: "每次二分后，左右两半至少有一半是有序的，判断 target 是否落在有序半边里。",
    explanation: ["如果 nums[left] <= nums[mid]，左半边有序。", "target 在左半边范围内，就收缩到左边。", "否则去另一边。"],
    code: `class Solution {
    public int search(int[] nums, int target) {
        int left = 0;
        int right = nums.length - 1;

        while (left <= right) {
            int mid = left + (right - left) / 2;

            if (nums[mid] == target) {
                return mid;
            }

            // 左半边有序
            if (nums[left] <= nums[mid]) {
                if (nums[left] <= target && target < nums[mid]) {
                    right = mid - 1;
                } else {
                    left = mid + 1;
                }
            } else {
                // 右半边有序
                if (nums[mid] < target && target <= nums[right]) {
                    left = mid + 1;
                } else {
                    right = mid - 1;
                }
            }
        }

        return -1;
    }
}`
  },
  {
    slug: "find-minimum-in-rotated-sorted-array",
    title: "寻找旋转排序数组中的最小值",
    english: "Find Minimum in Rotated Sorted Array",
    difficulty: "Medium",
    group: "二分查找",
    topic: "旋转数组二分",
    method: "和右端点比较",
    goal: "找到旋转升序数组中的最小值",
    complexity: "时间 O(log n)，空间 O(1)",
    description: "给一个无重复元素的旋转升序数组，返回其中最小元素。",
    example: "输入：nums = [3,4,5,1,2]\n输出：1",
    thought: "用 mid 和 right 比较；如果 nums[mid] > nums[right]，最小值在右边，否则在左边含 mid。",
    explanation: ["右半段如果被旋转，右边会有更小值。", "nums[mid] 大于 nums[right] 说明最小值一定在 mid 右侧。", "否则 mid 可能就是最小值，保留 mid。"],
    code: `class Solution {
    public int findMin(int[] nums) {
        int left = 0;
        int right = nums.length - 1;

        while (left < right) {
            int mid = left + (right - left) / 2;

            if (nums[mid] > nums[right]) {
                // 最小值在右半边
                left = mid + 1;
            } else {
                // 最小值在左半边，mid 也可能是答案
                right = mid;
            }
        }

        return nums[left];
    }
}`
  },
  {
    slug: "median-of-two-sorted-arrays",
    title: "寻找两个正序数组的中位数",
    english: "Median of Two Sorted Arrays",
    difficulty: "Hard",
    group: "二分查找",
    topic: "二分划分",
    method: "较短数组上二分",
    goal: "在两个有序数组中找到总体中位数",
    complexity: "时间 O(log(min(m,n)))，空间 O(1)",
    description: "给两个升序数组，返回它们合并后的中位数，要求对数时间复杂度。",
    example: "输入：nums1 = [1,3], nums2 = [2]\n输出：2.0",
    thought: "在较短数组上二分切分位置，让左半部分有 (m+n+1)/2 个元素，并且左边最大值不大于右边最小值。",
    explanation: ["不需要真的合并数组。", "左半部分固定放 (m+n+1)/2 个元素；总长度为奇数时，左边会多一个。", "只要找到一个划分，使两个数组左侧元素都小于等于右侧。", "中位数就由左侧最大值和右侧最小值决定。"],
    code: `class Solution {
    public double findMedianSortedArrays(int[] nums1, int[] nums2) {
        // 保证 nums1 更短，二分范围更小
        if (nums1.length > nums2.length) {
            return findMedianSortedArrays(nums2, nums1);
        }

        int m = nums1.length;
        int n = nums2.length;
        int left = 0;
        int right = m;

        while (left <= right) {
            int i = left + (right - left) / 2;
            int j = (m + n + 1) / 2 - i;

            int maxLeftA = i == 0 ? Integer.MIN_VALUE : nums1[i - 1];
            int minRightA = i == m ? Integer.MAX_VALUE : nums1[i];
            int maxLeftB = j == 0 ? Integer.MIN_VALUE : nums2[j - 1];
            int minRightB = j == n ? Integer.MAX_VALUE : nums2[j];

            if (maxLeftA <= minRightB && maxLeftB <= minRightA) {
                if ((m + n) % 2 == 1) {
                    return Math.max(maxLeftA, maxLeftB);
                }
                return ((double) Math.max(maxLeftA, maxLeftB) + Math.min(minRightA, minRightB)) / 2.0;
            } else if (maxLeftA > minRightB) {
                right = i - 1;
            } else {
                left = i + 1;
            }
        }

        return 0.0;
    }
}`
  },
  {
    slug: "valid-parentheses",
    title: "有效的括号",
    english: "Valid Parentheses",
    difficulty: "Easy",
    group: "栈",
    topic: "栈",
    method: "栈匹配",
    goal: "判断括号字符串是否合法",
    complexity: "时间 O(n + 输出长度)，空间 O(n + 输出长度)",
    description: "给只包含括号字符的字符串，判断括号是否有效闭合。",
    example: "输入：s = \"()[]{}\"\n输出：true",
    thought: "遇到左括号入栈；遇到右括号时，栈顶必须是对应的左括号。",
    explanation: ["栈适合处理最近打开、最先关闭的问题。", "右括号必须匹配最近的左括号。", "最后栈为空才说明全部匹配。"],
    code: `import java.util.Stack;

class Solution {
    public boolean isValid(String s) {
        Stack<Character> stack = new Stack<>();

        for (char c : s.toCharArray()) {
            if (c == '(' || c == '[' || c == '{') {
                stack.push(c);
            } else {
                if (stack.isEmpty()) {
                    return false;
                }

                char left = stack.pop();
                if (c == ')' && left != '(') {
                    return false;
                }
                if (c == ']' && left != '[') {
                    return false;
                }
                if (c == '}' && left != '{') {
                    return false;
                }
            }
        }

        return stack.isEmpty();
    }
}`
  },
  {
    slug: "min-stack",
    title: "最小栈",
    english: "Min Stack",
    difficulty: "Medium",
    group: "栈",
    topic: "辅助栈",
    method: "数据栈 + 最小值栈",
    goal: "实现能 O(1) 获取最小值的栈",
    complexity: "每次操作时间 O(1)，空间 O(n)",
    description: "设计一个栈，支持 push、pop、top，并能在常数时间内检索最小元素。",
    example: "输入：push(-2), push(0), push(-3), getMin(), pop(), top(), getMin()\n输出：-3, 0, -2",
    thought: "一个栈正常存数据，另一个栈同步存“当前最小值”。",
    explanation: ["每 push 一个数，minStack 也 push 当前最小值。", "pop 时两个栈一起 pop。", "minStack 栈顶就是当前最小值。"],
    code: `import java.util.Stack;

class MinStack {
    private Stack<Integer> stack = new Stack<>();
    private Stack<Integer> minStack = new Stack<>();

    public void push(int val) {
        stack.push(val);

        // minStack 栈顶保存当前最小值
        if (minStack.isEmpty()) {
            minStack.push(val);
        } else {
            minStack.push(Math.min(val, minStack.peek()));
        }
    }

    public void pop() {
        stack.pop();
        minStack.pop();
    }

    public int top() {
        return stack.peek();
    }

    public int getMin() {
        return minStack.peek();
    }
}`
  },
  {
    slug: "decode-string",
    title: "字符串解码",
    english: "Decode String",
    difficulty: "Medium",
    group: "栈",
    topic: "栈",
    method: "数字栈 + 字符串栈",
    goal: "解码 k[encoded_string] 格式字符串",
    complexity: "时间 O(n)，空间 O(n)",
    description: "给经过编码的字符串，按 k[字符串] 的规则解码。",
    example: "输入：s = \"3[a2[c]]\"\n输出：\"accaccacc\"",
    thought: "遇到 '[' 时保存当前数字和之前的字符串；遇到 ']' 时弹出并重复当前片段。",
    explanation: ["num 负责解析多位数字。", "strStack 保存进入括号前的字符串。", "countStack 保存括号前的重复次数。"],
    code: `import java.util.Stack;

class Solution {
    public String decodeString(String s) {
        Stack<Integer> countStack = new Stack<>();
        Stack<StringBuilder> strStack = new Stack<>();
        StringBuilder cur = new StringBuilder();
        int num = 0;

        for (char c : s.toCharArray()) {
            if (Character.isDigit(c)) {
                num = num * 10 + c - '0';
            } else if (c == '[') {
                countStack.push(num);
                strStack.push(cur);
                cur = new StringBuilder();
                num = 0;
            } else if (c == ']') {
                int count = countStack.pop();
                StringBuilder prev = strStack.pop();
                for (int i = 0; i < count; i++) {
                    prev.append(cur);
                }
                cur = prev;
            } else {
                cur.append(c);
            }
        }

        return cur.toString();
    }
}`
  },
  {
    slug: "daily-temperatures",
    title: "每日温度",
    english: "Daily Temperatures",
    difficulty: "Medium",
    group: "栈",
    topic: "单调栈",
    method: "单调递减栈",
    goal: "求每一天还要等几天才有更高温度",
    complexity: "时间 O(n)，空间 O(n)",
    description: "给每天温度，返回每一天需要等待多少天才会有更高温度；没有则为 0。",
    example: "输入：temperatures = [73,74,75,71,69,72,76,73]\n输出：[1,1,4,2,1,1,0,0]",
    thought: "栈里保存还没找到更高温度的日期下标；当前温度更高时，就结算栈顶日期。",
    explanation: ["栈中温度保持递减。", "当前温度比栈顶高，说明栈顶等到了答案。", "每个下标最多入栈出栈一次。"],
    code: `import java.util.Stack;

class Solution {
    public int[] dailyTemperatures(int[] temperatures) {
        int n = temperatures.length;
        int[] ans = new int[n];
        Stack<Integer> stack = new Stack<>();

        for (int i = 0; i < n; i++) {
            // 当前温度能解决之前更低温度的等待天数
            while (!stack.isEmpty() && temperatures[i] > temperatures[stack.peek()]) {
                int prev = stack.pop();
                ans[prev] = i - prev;
            }

            stack.push(i);
        }

        return ans;
    }
}`
  },
  {
    slug: "largest-rectangle-in-histogram",
    title: "柱状图中最大的矩形",
    english: "Largest Rectangle in Histogram",
    difficulty: "Hard",
    group: "栈",
    topic: "单调栈",
    method: "单调递增栈",
    goal: "求柱状图能形成的最大矩形面积",
    complexity: "时间 O(n)，空间 O(n)",
    description: "给柱状图每个柱子的高度，求能形成的最大矩形面积。",
    example: "输入：heights = [2,1,5,6,2,3]\n输出：10",
    thought: "用单调递增栈；当遇到更矮柱子时，就能确定被弹出柱子的左右边界并计算面积。",
    explanation: ["栈里保存高度递增的下标。", "当前柱子更矮时，被弹出柱子的右边第一个更矮位置就是 i。", "弹出后新的栈顶是左边第一个更矮位置 left，所以宽度是 i - left - 1。"],
    code: `import java.util.Stack;

class Solution {
    public int largestRectangleArea(int[] heights) {
        Stack<Integer> stack = new Stack<>();
        int ans = 0;

        for (int i = 0; i <= heights.length; i++) {
            // 最后加一个高度 0，强制清空栈
            int curHeight = i == heights.length ? 0 : heights[i];

            while (!stack.isEmpty() && curHeight < heights[stack.peek()]) {
                int height = heights[stack.pop()];
                int left = stack.isEmpty() ? -1 : stack.peek();
                int width = i - left - 1;
                ans = Math.max(ans, height * width);
            }

            stack.push(i);
        }

        return ans;
    }
}`
  },
  {
    slug: "kth-largest-element-in-an-array",
    title: "数组中的第 K 个最大元素",
    english: "Kth Largest Element in an Array",
    difficulty: "Medium",
    group: "堆",
    topic: "小根堆",
    method: "大小为 k 的小根堆",
    goal: "找到数组中第 k 大的元素",
    complexity: "时间 O(n log k)，空间 O(k)",
    description: "给数组和整数 k，返回数组中第 k 大的元素。",
    example: "输入：nums = [3,2,1,5,6,4], k = 2\n输出：5",
    thought: "维护一个大小为 k 的小根堆，堆里始终保存目前最大的 k 个数，堆顶就是第 k 大。",
    explanation: ["小根堆堆顶是堆中最小值。", "堆大小超过 k 时弹出堆顶。", "遍历结束后，堆中剩下最大的 k 个数，堆顶就是第 k 大。"],
    code: `import java.util.PriorityQueue;

class Solution {
    public int findKthLargest(int[] nums, int k) {
        PriorityQueue<Integer> heap = new PriorityQueue<>();

        for (int num : nums) {
            heap.offer(num);

            // 只保留最大的 k 个数
            if (heap.size() > k) {
                heap.poll();
            }
        }

        return heap.peek();
    }
}`
  },
  {
    slug: "top-k-frequent-elements",
    title: "前 K 个高频元素",
    english: "Top K Frequent Elements",
    difficulty: "Medium",
    group: "堆",
    topic: "哈希 + 堆",
    method: "统计频率 + 小根堆",
    goal: "返回出现频率最高的 k 个元素",
    complexity: "时间 O(n log k)，空间 O(n)",
    description: "给整数数组和 k，返回出现频率最高的 k 个元素。",
    example: "输入：nums = [1,1,1,2,2,3], k = 2\n输出：[1,2]",
    thought: "先用 HashMap 统计频率，再用大小为 k 的小根堆保留频率最高的 k 个数。",
    explanation: ["map 记录每个数字出现次数。", "堆按照频率从小到大排列。", "堆超过 k 时弹出低频元素。"],
    code: `import java.util.*;

class Solution {
    public int[] topKFrequent(int[] nums, int k) {
        Map<Integer, Integer> count = new HashMap<>();
        for (int num : nums) {
            count.put(num, count.getOrDefault(num, 0) + 1);
        }

        PriorityQueue<Integer> heap = new PriorityQueue<>((a, b) -> Integer.compare(count.get(a), count.get(b)));

        for (int num : count.keySet()) {
            heap.offer(num);
            if (heap.size() > k) {
                heap.poll();
            }
        }

        int[] ans = new int[k];
        for (int i = 0; i < k; i++) {
            ans[i] = heap.poll();
        }

        return ans;
    }
}`
  },
  {
    slug: "find-median-from-data-stream",
    title: "数据流的中位数",
    english: "Find Median from Data Stream",
    difficulty: "Hard",
    group: "堆",
    topic: "双堆",
    method: "大根堆 + 小根堆",
    goal: "动态加入数字并快速返回中位数",
    complexity: "addNum 时间 O(log n)，findMedian 时间 O(1)",
    description: "设计一个数据结构，支持不断加入数字，并返回当前所有数字的中位数。",
    example: "输入：addNum(1), addNum(2), findMedian(), addNum(3), findMedian()\n输出：1.5, 2.0",
    thought: "用大根堆保存较小的一半，小根堆保存较大的一半，并让两个堆大小最多差 1。",
    explanation: ["small 的堆顶是较小一半的最大值。", "large 的堆顶是较大一半的最小值。", "数量奇数时，多的那个堆顶就是中位数。"],
    code: `import java.util.Collections;
import java.util.PriorityQueue;

class MedianFinder {
    // small 是大根堆，保存较小的一半
    private PriorityQueue<Integer> small = new PriorityQueue<>(Collections.reverseOrder());
    // large 是小根堆，保存较大的一半
    private PriorityQueue<Integer> large = new PriorityQueue<>();

    public void addNum(int num) {
        if (small.isEmpty() || num <= small.peek()) {
            small.offer(num);
        } else {
            large.offer(num);
        }

        // 平衡两个堆大小
        if (small.size() > large.size() + 1) {
            large.offer(small.poll());
        } else if (large.size() > small.size()) {
            small.offer(large.poll());
        }
    }

    public double findMedian() {
        if (small.size() > large.size()) {
            return small.peek();
        }
        return ((double) small.peek() + large.peek()) / 2.0;
    }
}`
  },
  {
    slug: "best-time-to-buy-and-sell-stock",
    title: "买卖股票的最佳时机",
    english: "Best Time to Buy and Sell Stock",
    difficulty: "Easy",
    group: "贪心算法",
    topic: "贪心",
    method: "维护历史最低价",
    goal: "一次买卖获得最大利润",
    complexity: "时间 O(n)，空间 O(1)",
    description: "给每天股票价格，只允许先买后卖一次，求最大利润。",
    example: "输入：prices = [7,1,5,3,6,4]\n输出：5",
    thought: "遍历价格时维护到目前为止的最低买入价，用当前价格减最低价更新最大利润。",
    explanation: ["买入必须发生在卖出之前。", "到第 i 天时，最好的买入价就是前面最低价。", "每天都尝试今天卖出。"],
    code: `class Solution {
    public int maxProfit(int[] prices) {
        int minPrice = Integer.MAX_VALUE;
        int ans = 0;

        for (int price : prices) {
            // 更新历史最低买入价
            minPrice = Math.min(minPrice, price);
            // 尝试今天卖出
            ans = Math.max(ans, price - minPrice);
        }

        return ans;
    }
}`
  },
  {
    slug: "jump-game",
    title: "跳跃游戏",
    english: "Jump Game",
    difficulty: "Medium",
    group: "贪心算法",
    topic: "贪心",
    method: "维护最远可达位置",
    goal: "判断能否到达最后一个下标",
    complexity: "时间 O(n)，空间 O(1)",
    description: "给数组 nums，nums[i] 表示从位置 i 最多能跳几步，判断能否到达最后一个位置。",
    example: "输入：nums = [2,3,1,1,4]\n输出：true",
    thought: "一路维护当前能到达的最远位置；如果某个位置超过最远位置，就说明到不了。",
    explanation: ["farthest 表示目前能跳到的最远下标。", "只有 i <= farthest 的位置才可达。", "可达位置会继续扩展 farthest。"],
    code: `class Solution {
    public boolean canJump(int[] nums) {
        int farthest = 0;

        for (int i = 0; i < nums.length; i++) {
            if (i > farthest) {
                return false;
            }

            // 从当前位置能扩展到的最远位置
            farthest = Math.max(farthest, i + nums[i]);
        }

        return true;
    }
}`
  },
  {
    slug: "jump-game-ii",
    title: "跳跃游戏 II",
    english: "Jump Game II",
    difficulty: "Medium",
    group: "贪心算法",
    topic: "贪心",
    method: "按层扩展最远位置",
    goal: "求到达最后一个下标的最少跳跃次数",
    complexity: "时间 O(n)，空间 O(1)",
    description: "给数组 nums，求从下标 0 跳到最后一个下标的最少跳跃次数；题目保证一定能到达最后一个位置。",
    example: "输入：nums = [2,3,1,1,4]\n输出：2",
    thought: "把当前一步能覆盖的范围看成一层，遍历到当前层边界时必须跳一次，并更新下一层边界。",
    explanation: ["end 表示当前跳数能到达的边界。", "farthest 表示下一跳能到的最远位置。", "走到 end 时，跳数加 1，边界变成 farthest。", "这份代码依赖“保证可达”的前提；如果不保证可达，需要额外判断 farthest 是否停住。"],
    code: `class Solution {
    public int jump(int[] nums) {
        int jumps = 0;
        int end = 0;
        int farthest = 0;

        // 最后一个位置不需要再起跳
        for (int i = 0; i < nums.length - 1; i++) {
            farthest = Math.max(farthest, i + nums[i]);

            // 到达当前跳数的边界，必须再跳一次
            if (i == end) {
                jumps++;
                end = farthest;
            }
        }

        return jumps;
    }
}`
  },
  {
    slug: "partition-labels",
    title: "划分字母区间",
    english: "Partition Labels",
    difficulty: "Medium",
    group: "贪心算法",
    topic: "贪心",
    method: "记录字符最后位置",
    goal: "把字符串切成尽量多片，使同一字母只出现在一个片段中",
    complexity: "时间 O(n)，空间 O(1)",
    description: "给只含小写英文字母的字符串 s，把它划分成尽可能多的片段，使每个字母最多出现在一个片段里。",
    example: "输入：s = \"ababcbacadefegdehijhklij\"\n输出：[9,7,8]",
    thought: "先记录每个字符最后出现位置，遍历时维护当前片段必须覆盖到的最远右边界。",
    explanation: ["一个片段里出现的所有字符，都必须包含它们最后一次出现的位置。", "end 是当前片段最远必须到达的位置。", "当 i == end 时，可以切一段。"],
    code: `import java.util.*;

class Solution {
    public List<Integer> partitionLabels(String s) {
        int[] last = new int[26];

        for (int i = 0; i < s.length(); i++) {
            last[s.charAt(i) - 'a'] = i;
        }

        List<Integer> ans = new ArrayList<>();
        int start = 0;
        int end = 0;

        for (int i = 0; i < s.length(); i++) {
            end = Math.max(end, last[s.charAt(i) - 'a']);

            if (i == end) {
                ans.add(end - start + 1);
                start = i + 1;
            }
        }

        return ans;
    }
}`
  },
  {
    slug: "climbing-stairs",
    title: "爬楼梯",
    english: "Climbing Stairs",
    difficulty: "Easy",
    group: "动态规划",
    topic: "DP",
    method: "斐波那契",
    goal: "计算爬到第 n 阶的方法数",
    complexity: "时间 O(n)，空间 O(1)",
    description: "每次可以爬 1 或 2 阶，求爬到第 n 阶共有多少种方法。",
    example: "输入：n = 3\n输出：3\n解释：1+1+1、1+2、2+1",
    thought: "到第 i 阶只能从 i-1 或 i-2 来，所以 dp[i] = dp[i-1] + dp[i-2]。",
    explanation: ["最后一步爬 1 阶，之前在 i-1。", "最后一步爬 2 阶，之前在 i-2。", "只需要保留前两个状态。"],
    code: `class Solution {
    public int climbStairs(int n) {
        if (n <= 2) {
            return n;
        }

        int a = 1;
        int b = 2;

        for (int i = 3; i <= n; i++) {
            int c = a + b;
            a = b;
            b = c;
        }

        return b;
    }
}`
  },
  {
    slug: "pascals-triangle",
    title: "杨辉三角",
    english: "Pascal's Triangle",
    difficulty: "Easy",
    group: "动态规划",
    topic: "模拟",
    method: "逐行生成",
    goal: "生成前 numRows 行杨辉三角",
    complexity: "时间 O(n²)，空间 O(1)，不算返回结果",
    description: "给整数 numRows，生成杨辉三角的前 numRows 行。",
    example: "输入：numRows = 5\n输出：[[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]",
    thought: "每一行首尾都是 1，中间每个数等于上一行相邻两个数之和。",
    explanation: ["第 i 行有 i+1 个数。", "首尾直接放 1。", "中间位置来自上一行 j-1 和 j。"],
    code: `import java.util.*;

class Solution {
    public List<List<Integer>> generate(int numRows) {
        List<List<Integer>> ans = new ArrayList<>();

        for (int i = 0; i < numRows; i++) {
            List<Integer> row = new ArrayList<>();

            for (int j = 0; j <= i; j++) {
                if (j == 0 || j == i) {
                    row.add(1);
                } else {
                    int value = ans.get(i - 1).get(j - 1) + ans.get(i - 1).get(j);
                    row.add(value);
                }
            }

            ans.add(row);
        }

        return ans;
    }
}`
  },
  {
    slug: "house-robber",
    title: "打家劫舍",
    english: "House Robber",
    difficulty: "Medium",
    group: "动态规划",
    topic: "DP",
    method: "偷或不偷",
    goal: "在不能偷相邻房子的限制下获得最大金额",
    complexity: "时间 O(n)，空间 O(1)",
    description: "给每间房的钱，相邻房子不能同时偷，求能偷到的最大金额。",
    example: "输入：nums = [1,2,3,1]\n输出：4",
    thought: "到当前房子时，要么不偷，保持前一个最优；要么偷，加上前前一个最优。",
    explanation: ["dp[i] = max(dp[i-1], dp[i-2] + nums[i])。", "只需要前两个状态。", "每间房都做一次选择。"],
    code: `class Solution {
    public int rob(int[] nums) {
        int prev2 = 0;
        int prev1 = 0;

        for (int money : nums) {
            // 偷当前房子，就只能接 prev2
            int cur = Math.max(prev1, prev2 + money);
            prev2 = prev1;
            prev1 = cur;
        }

        return prev1;
    }
}`
  },
  {
    slug: "perfect-squares",
    title: "完全平方数",
    english: "Perfect Squares",
    difficulty: "Medium",
    group: "动态规划",
    topic: "完全背包",
    method: "DP",
    goal: "求和为 n 的完全平方数最少数量",
    complexity: "时间 O(n√n)，空间 O(n)",
    description: "给整数 n，返回和为 n 的完全平方数的最少数量。",
    example: "输入：n = 12\n输出：3\n解释：12 = 4 + 4 + 4",
    thought: "dp[i] 表示凑出 i 的最少平方数个数，枚举最后使用的平方数 j*j。",
    explanation: ["如果最后用了 j*j，那么前面要凑 i - j*j。", "状态转移：dp[i] = min(dp[i], dp[i-j*j]+1)。", "从 1 到 n 逐步计算。"],
    code: `import java.util.Arrays;

class Solution {
    public int numSquares(int n) {
        int[] dp = new int[n + 1];
        Arrays.fill(dp, Integer.MAX_VALUE);
        dp[0] = 0;

        for (int i = 1; i <= n; i++) {
            for (int j = 1; j * j <= i; j++) {
                dp[i] = Math.min(dp[i], dp[i - j * j] + 1);
            }
        }

        return dp[n];
    }
}`
  },
  {
    slug: "coin-change",
    title: "零钱兑换",
    english: "Coin Change",
    difficulty: "Medium",
    group: "动态规划",
    topic: "完全背包",
    method: "DP",
    goal: "用最少硬币凑出 amount",
    complexity: "时间 O(amount * n)，空间 O(amount)",
    description: "给硬币面额和总金额，返回凑成该金额所需最少硬币数；无法凑成返回 -1。",
    example: "输入：coins = [1,2,5], amount = 11\n输出：3\n解释：11 = 5 + 5 + 1",
    thought: "dp[i] 表示凑出金额 i 的最少硬币数，枚举最后一枚硬币。",
    explanation: ["如果最后一枚硬币是 coin，那么之前要凑 i - coin。", "dp[i] = min(dp[i], dp[i-coin]+1)。", "初始值设成 amount+1 代表不可达。"],
    code: `import java.util.Arrays;

class Solution {
    public int coinChange(int[] coins, int amount) {
        int[] dp = new int[amount + 1];
        Arrays.fill(dp, amount + 1);
        dp[0] = 0;

        for (int i = 1; i <= amount; i++) {
            for (int coin : coins) {
                if (i >= coin) {
                    dp[i] = Math.min(dp[i], dp[i - coin] + 1);
                }
            }
        }

        return dp[amount] > amount ? -1 : dp[amount];
    }
}`
  },
  {
    slug: "word-break",
    title: "单词拆分",
    english: "Word Break",
    difficulty: "Medium",
    group: "动态规划",
    topic: "DP",
    method: "字符串 DP",
    goal: "判断字符串能否由字典单词拼出",
    complexity: "当前 Java 写法最坏时间 O(n³)，空间 O(n + 字典大小)",
    description: "给字符串 s 和单词字典，判断 s 是否可以由字典中的单词拼接而成；字典里的单词可以重复使用。",
    example: "输入：s = \"leetcode\", wordDict = [\"leet\",\"code\"]\n输出：true",
    thought: "dp[i] 表示 s 的前 i 个字符能否被拆分，枚举最后一个单词的起点 j。",
    explanation: ["如果 dp[j] 为 true 且 s[j..i) 在字典中，那么 dp[i] 为 true。", "用 HashSet 加速查单词。", "从短到长计算 dp。", "Java 的 substring(j, i) 会创建字符串，所以当前写法最坏复杂度按 O(n³) 记。"],
    code: `import java.util.*;

class Solution {
    public boolean wordBreak(String s, List<String> wordDict) {
        Set<String> set = new HashSet<>(wordDict);
        boolean[] dp = new boolean[s.length() + 1];
        dp[0] = true;

        for (int i = 1; i <= s.length(); i++) {
            for (int j = 0; j < i; j++) {
                if (dp[j] && set.contains(s.substring(j, i))) {
                    dp[i] = true;
                    break;
                }
            }
        }

        return dp[s.length()];
    }
}`
  },
  {
    slug: "longest-increasing-subsequence",
    title: "最长递增子序列",
    english: "Longest Increasing Subsequence",
    difficulty: "Medium",
    group: "动态规划",
    topic: "DP",
    method: "基础 DP",
    goal: "求最长严格递增子序列长度",
    complexity: "时间 O(n²)，空间 O(n)",
    description: "给整数数组，返回最长严格递增子序列的长度。",
    example: "输入：nums = [10,9,2,5,3,7,101,18]\n输出：4",
    thought: "dp[i] 表示以 nums[i] 结尾的最长递增子序列长度，往前找比它小的数来转移。",
    explanation: ["如果 nums[j] < nums[i]，nums[i] 可以接在 nums[j] 后面。", "dp[i] = max(dp[i], dp[j]+1)。", "答案是所有 dp[i] 的最大值。"],
    code: `import java.util.Arrays;

class Solution {
    public int lengthOfLIS(int[] nums) {
        int n = nums.length;
        int[] dp = new int[n];
        Arrays.fill(dp, 1);
        int ans = 1;

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < i; j++) {
                if (nums[j] < nums[i]) {
                    dp[i] = Math.max(dp[i], dp[j] + 1);
                }
            }
            ans = Math.max(ans, dp[i]);
        }

        return ans;
    }
}`
  },
  {
    slug: "maximum-product-subarray",
    title: "乘积最大子数组",
    english: "Maximum Product Subarray",
    difficulty: "Medium",
    group: "动态规划",
    topic: "DP",
    method: "同时维护最大最小乘积",
    goal: "找到乘积最大的连续子数组",
    complexity: "时间 O(n)，空间 O(1)",
    description: "给整数数组，返回连续子数组的最大乘积。",
    example: "输入：nums = [2,3,-2,4]\n输出：6",
    thought: "负数会让最大变最小、最小变最大，所以同时维护以当前位置结尾的最大乘积和最小乘积。",
    explanation: ["遇到负数时，之前的最小乘积可能变成最大。", "max 表示以当前位置结尾的最大乘积。", "min 表示以当前位置结尾的最小乘积。"],
    code: `class Solution {
    public int maxProduct(int[] nums) {
        int max = nums[0];
        int min = nums[0];
        int ans = nums[0];

        for (int i = 1; i < nums.length; i++) {
            int num = nums[i];

            // 负数会交换最大和最小的角色
            if (num < 0) {
                int temp = max;
                max = min;
                min = temp;
            }

            max = Math.max(num, max * num);
            min = Math.min(num, min * num);
            ans = Math.max(ans, max);
        }

        return ans;
    }
}`
  },
  {
    slug: "partition-equal-subset-sum",
    title: "分割等和子集",
    english: "Partition Equal Subset Sum",
    difficulty: "Medium",
    group: "动态规划",
    topic: "0/1 背包",
    method: "背包 DP",
    goal: "判断数组能否分成两个和相等的子集",
    complexity: "时间 O(n * sum)，空间 O(sum)",
    description: "给只包含正整数的数组，判断能否分割成两个子集，使两个子集元素和相等。",
    example: "输入：nums = [1,5,11,5]\n输出：true",
    thought: "如果总和为偶数，问题变成能否选一些数凑出 sum/2。",
    explanation: ["总和为奇数一定不行。", "target = sum / 2。", "每个数只能用一次，所以从后往前更新 dp。"],
    code: `class Solution {
    public boolean canPartition(int[] nums) {
        int sum = 0;
        for (int num : nums) {
            sum += num;
        }

        if (sum % 2 == 1) {
            return false;
        }

        int target = sum / 2;
        boolean[] dp = new boolean[target + 1];
        dp[0] = true;

        for (int num : nums) {
            // 0/1 背包要倒序，避免一个数被重复使用
            for (int j = target; j >= num; j--) {
                dp[j] = dp[j] || dp[j - num];
            }
        }

        return dp[target];
    }
}`
  },
  {
    slug: "longest-valid-parentheses",
    title: "最长有效括号",
    english: "Longest Valid Parentheses",
    difficulty: "Hard",
    group: "栈",
    topic: "栈",
    method: "栈保存下标",
    goal: "求最长合法括号子串长度",
    complexity: "时间 O(n)，空间 O(n)",
    description: "给只包含 '(' 和 ')' 的字符串，返回最长有效括号子串长度。",
    example: "输入：s = \")()())\"\n输出：4",
    thought: "栈保存还没匹配的下标，栈底放最后一个无效右括号位置，用当前位置减栈顶得到合法长度。",
    explanation: ["遇到 '(' 入栈。", "遇到 ')' 先弹出一个匹配。", "如果栈空，当前右括号成为新的无效边界；否则更新长度。"],
    code: `import java.util.Stack;

class Solution {
    public int longestValidParentheses(String s) {
        Stack<Integer> stack = new Stack<>();
        stack.push(-1);
        int ans = 0;

        for (int i = 0; i < s.length(); i++) {
            if (s.charAt(i) == '(') {
                stack.push(i);
            } else {
                stack.pop();

                if (stack.isEmpty()) {
                    // 当前右括号无法匹配，作为新的边界
                    stack.push(i);
                } else {
                    ans = Math.max(ans, i - stack.peek());
                }
            }
        }

        return ans;
    }
}`
  },
  {
    slug: "unique-paths",
    title: "不同路径",
    english: "Unique Paths",
    difficulty: "Medium",
    group: "多维动态规划",
    topic: "二维 DP",
    method: "网格 DP",
    goal: "求从左上到右下的路径数",
    complexity: "时间 O(mn)，空间 O(n)",
    description: "机器人从左上角到右下角，只能向右或向下走，求不同路径数量。",
    example: "输入：m = 3, n = 7\n输出：28",
    thought: "到每个格子只能从上方或左方来，所以路径数等于上方路径数加左方路径数。",
    explanation: ["第一行和第一列都只有一种走法。", "用一维 dp 保存当前行路径数。", "dp[j] = dp[j] + dp[j-1]。"],
    code: `class Solution {
    public int uniquePaths(int m, int n) {
        int[] dp = new int[n];

        // 第一行每个位置都只有一种走法
        for (int j = 0; j < n; j++) {
            dp[j] = 1;
        }

        for (int i = 1; i < m; i++) {
            for (int j = 1; j < n; j++) {
                dp[j] = dp[j] + dp[j - 1];
            }
        }

        return dp[n - 1];
    }
}`
  },
  {
    slug: "minimum-path-sum",
    title: "最小路径和",
    english: "Minimum Path Sum",
    difficulty: "Medium",
    group: "多维动态规划",
    topic: "二维 DP",
    method: "网格 DP",
    goal: "求从左上到右下的最小路径和",
    complexity: "时间 O(mn)，空间 O(1)",
    description: "给非负整数网格，从左上角到右下角，每次只能向右或向下，求路径最小和。",
    example: "输入：grid = [[1,3,1],[1,5,1],[4,2,1]]\n输出：7",
    thought: "到每个格子的最小路径和，等于上方和左方较小者加当前格子值。",
    explanation: ["可以直接在原 grid 上改成 dp 值。", "第一行只能从左边来。", "第一列只能从上面来。"],
    code: `class Solution {
    public int minPathSum(int[][] grid) {
        int m = grid.length;
        int n = grid[0].length;

        for (int i = 1; i < m; i++) {
            grid[i][0] += grid[i - 1][0];
        }

        for (int j = 1; j < n; j++) {
            grid[0][j] += grid[0][j - 1];
        }

        for (int i = 1; i < m; i++) {
            for (int j = 1; j < n; j++) {
                grid[i][j] += Math.min(grid[i - 1][j], grid[i][j - 1]);
            }
        }

        return grid[m - 1][n - 1];
    }
}`
  },
  {
    slug: "longest-palindromic-substring",
    title: "最长回文子串",
    english: "Longest Palindromic Substring",
    difficulty: "Medium",
    group: "中心扩展",
    topic: "中心扩展",
    method: "中心扩展",
    goal: "找出最长回文子串",
    complexity: "时间 O(n²)，空间 O(1)",
    description: "给字符串 s，返回其中最长的回文子串。",
    example: "输入：s = \"babad\"\n输出：\"bab\" 或 \"aba\"",
    thought: "枚举每个位置作为回文中心，分别向两边扩展奇数长度和偶数长度回文。",
    explanation: ["回文可能有一个中心，也可能有两个中心。", "从中心往外，只要左右字符相等就继续扩展。", "记录最长区间。"],
    code: `class Solution {
    public String longestPalindrome(String s) {
        int start = 0;
        int end = 0;

        for (int i = 0; i < s.length(); i++) {
            int len1 = expand(s, i, i);
            int len2 = expand(s, i, i + 1);
            int len = Math.max(len1, len2);

            if (len > end - start + 1) {
                start = i - (len - 1) / 2;
                end = i + len / 2;
            }
        }

        return s.substring(start, end + 1);
    }

    private int expand(String s, int left, int right) {
        while (left >= 0 && right < s.length() && s.charAt(left) == s.charAt(right)) {
            left--;
            right++;
        }
        return right - left - 1;
    }
}`
  },
  {
    slug: "longest-common-subsequence",
    title: "最长公共子序列",
    english: "Longest Common Subsequence",
    difficulty: "Medium",
    group: "多维动态规划",
    topic: "二维 DP",
    method: "字符串 DP",
    goal: "求两个字符串的最长公共子序列长度",
    complexity: "时间 O(mn)，空间 O(mn)",
    description: "给两个字符串，返回它们最长公共子序列的长度。",
    example: "输入：text1 = \"abcde\", text2 = \"ace\"\n输出：3",
    thought: "dp[i][j] 表示 text1 前 i 个字符和 text2 前 j 个字符的最长公共子序列长度。",
    explanation: ["如果当前两个字符相等，就接在前面的公共子序列后面。", "如果不等，就看去掉 text1 当前字符或去掉 text2 当前字符哪个更好。", "最后答案是 dp[m][n]。"],
    code: `class Solution {
    public int longestCommonSubsequence(String text1, String text2) {
        int m = text1.length();
        int n = text2.length();
        int[][] dp = new int[m + 1][n + 1];

        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (text1.charAt(i - 1) == text2.charAt(j - 1)) {
                    dp[i][j] = dp[i - 1][j - 1] + 1;
                } else {
                    dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
                }
            }
        }

        return dp[m][n];
    }
}`
  },
  {
    slug: "edit-distance",
    title: "编辑距离",
    english: "Edit Distance",
    difficulty: "Hard",
    group: "多维动态规划",
    topic: "二维 DP",
    method: "字符串 DP",
    goal: "求 word1 变成 word2 的最少操作数",
    complexity: "时间 O(mn)，空间 O(mn)",
    description: "给两个字符串，允许插入、删除、替换一个字符，求从 word1 转成 word2 的最少操作数。",
    example: "输入：word1 = \"horse\", word2 = \"ros\"\n输出：3",
    thought: "dp[i][j] 表示 word1 前 i 个字符变成 word2 前 j 个字符需要的最少操作数。",
    explanation: ["字符相同，不需要新操作。", "字符不同，可以插入、删除、替换，取三者最小值加 1。", "空字符串到另一个字符串的距离就是长度。"],
    code: `class Solution {
    public int minDistance(String word1, String word2) {
        int m = word1.length();
        int n = word2.length();
        int[][] dp = new int[m + 1][n + 1];

        for (int i = 0; i <= m; i++) {
            dp[i][0] = i;
        }
        for (int j = 0; j <= n; j++) {
            dp[0][j] = j;
        }

        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (word1.charAt(i - 1) == word2.charAt(j - 1)) {
                    dp[i][j] = dp[i - 1][j - 1];
                } else {
                    int insert = dp[i][j - 1];
                    int delete = dp[i - 1][j];
                    int replace = dp[i - 1][j - 1];
                    dp[i][j] = Math.min(Math.min(insert, delete), replace) + 1;
                }
            }
        }

        return dp[m][n];
    }
}`
  },
  {
    slug: "single-number",
    title: "只出现一次的数字",
    english: "Single Number",
    difficulty: "Easy",
    group: "技巧",
    topic: "位运算",
    method: "异或",
    goal: "找出唯一只出现一次的数字",
    complexity: "时间 O(n)，空间 O(1)",
    description: "给非空整数数组，除了某个元素只出现一次，其余每个元素都出现两次，找出只出现一次的元素。",
    example: "输入：nums = [4,1,2,1,2]\n输出：4",
    thought: "相同数字异或会抵消成 0，所有数字异或完剩下的就是只出现一次的数字。",
    explanation: ["a ^ a = 0。", "0 ^ a = a。", "异或满足交换律，所以成对数字都会抵消。"],
    code: `class Solution {
    public int singleNumber(int[] nums) {
        int ans = 0;

        for (int num : nums) {
            ans ^= num;
        }

        return ans;
    }
}`
  },
  {
    slug: "majority-element",
    title: "多数元素",
    english: "Majority Element",
    difficulty: "Easy",
    group: "技巧",
    topic: "摩尔投票",
    method: "候选人抵消",
    goal: "找出出现次数超过一半的元素",
    complexity: "时间 O(n)，空间 O(1)",
    description: "给数组，返回出现次数大于 n/2 的元素；题目保证多数元素一定存在。",
    example: "输入：nums = [2,2,1,1,1,2,2]\n输出：2",
    thought: "把多数元素和其他元素两两抵消，最后剩下的候选人就是多数元素。",
    explanation: ["count 为 0 时，换当前数做候选。", "遇到候选数 count 加 1。", "遇到不同数 count 减 1。"],
    code: `class Solution {
    public int majorityElement(int[] nums) {
        int candidate = 0;
        int count = 0;

        for (int num : nums) {
            if (count == 0) {
                candidate = num;
            }

            count += num == candidate ? 1 : -1;
        }

        return candidate;
    }
}`
  },
  {
    slug: "sort-colors",
    title: "颜色分类",
    english: "Sort Colors",
    difficulty: "Medium",
    group: "技巧",
    topic: "三指针",
    method: "荷兰国旗",
    goal: "原地把 0、1、2 排序",
    complexity: "时间 O(n)，空间 O(1)",
    description: "给只包含 0、1、2 的数组，原地按 0、1、2 顺序排序。",
    example: "输入：nums = [2,0,2,1,1,0]\n输出：[0,0,1,1,2,2]",
    thought: "用 left 放 0，right 放 2，i 扫描数组；遇到 0 交换到左边，遇到 2 交换到右边。",
    explanation: ["始终维护四段：`[0,left)` 是 0，`[left,i)` 是 1，`(right,n)` 是 2，`[i,right]` 是未知区域。", "遇到 0 放到 left 左侧，遇到 2 放到 right 右侧。", "从右边换回来的数还没检查，所以遇到 2 时 i 不动。"],
    code: `class Solution {
    public void sortColors(int[] nums) {
        int left = 0;
        int right = nums.length - 1;
        int i = 0;

        while (i <= right) {
            if (nums[i] == 0) {
                swap(nums, i, left);
                i++;
                left++;
            } else if (nums[i] == 2) {
                swap(nums, i, right);
                right--;
                // 换过来的数还没检查，所以 i 不动
            } else {
                i++;
            }
        }
    }

    private void swap(int[] nums, int i, int j) {
        int temp = nums[i];
        nums[i] = nums[j];
        nums[j] = temp;
    }
}`
  },
  {
    slug: "next-permutation",
    title: "下一个排列",
    english: "Next Permutation",
    difficulty: "Medium",
    group: "技巧",
    topic: "排列",
    method: "从右往左找枢轴",
    goal: "原地变成字典序下一个排列",
    complexity: "时间 O(n)，空间 O(1)",
    description: "给整数数组，将它原地变成字典序的下一个排列；如果不存在更大排列，就变成最小排列。",
    example: "输入：nums = [1,2,3]\n输出：[1,3,2]",
    thought: "从右往左找到第一个相邻升序对 nums[i] < nums[i+1]，这个 i 是枢轴；换成右侧刚好更大的数，再反转右侧。",
    explanation: ["枢轴右侧是递减的，说明右侧已经是这段的最大排列。", "找到枢轴后，要让它变大一点点。", "替换后反转右侧，让右侧变成最小排列。"],
    code: `class Solution {
    public void nextPermutation(int[] nums) {
        int i = nums.length - 2;

        // 从右往左找第一个相邻升序对，i 就是枢轴
        while (i >= 0 && nums[i] >= nums[i + 1]) {
            i--;
        }

        if (i >= 0) {
            int j = nums.length - 1;
            // 从右找第一个比 nums[i] 大的数
            while (nums[j] <= nums[i]) {
                j--;
            }
            swap(nums, i, j);
        }

        // 右侧反转成最小顺序
        reverse(nums, i + 1, nums.length - 1);
    }

    private void reverse(int[] nums, int left, int right) {
        while (left < right) {
            swap(nums, left++, right--);
        }
    }

    private void swap(int[] nums, int i, int j) {
        int temp = nums[i];
        nums[i] = nums[j];
        nums[j] = temp;
    }
}`
  },
  {
    slug: "find-the-duplicate-number",
    title: "寻找重复数",
    english: "Find the Duplicate Number",
    difficulty: "Medium",
    group: "技巧",
    topic: "快慢指针",
    method: "数组当链表找环入口",
    goal: "找出数组中唯一重复的数字",
    complexity: "时间 O(n)，空间 O(1)",
    description: "给长度为 n+1 的数组，数字都在 1 到 n 之间；不能修改数组，只能用 O(1) 额外空间，重复数字可能出现多次，找出这个重复数。",
    example: "输入：nums = [1,3,4,2,2]\n输出：2",
    thought: "把 nums[i] 看成从 i 指向 nums[i] 的链表，重复数字会形成环，找环入口就是重复数。",
    explanation: ["因为下标和值都在有限范围内，按 nums[i] 走一定会进入环。", "重复数字对应多个位置指向同一个入口。", "用 Floyd 快慢指针找环入口。"],
    code: `class Solution {
    public int findDuplicate(int[] nums) {
        int slow = nums[0];
        int fast = nums[0];

        // 第一阶段：快慢指针在环内相遇
        do {
            slow = nums[slow];
            fast = nums[nums[fast]];
        } while (slow != fast);

        // 第二阶段：找环入口
        slow = nums[0];
        while (slow != fast) {
            slow = nums[slow];
            fast = nums[fast];
        }

        return slow;
    }
}`
  }
];

window.problemCatalog = rawProblems.map((problem, index) => ({
  id: index + 1,
  hasCard: true,
  ...problem
}));
